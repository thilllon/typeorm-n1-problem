import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../employee/employee.entity';
import { Company } from './company.entity';
import { UpdateCompanyDto } from './update-company.dto';

// n + 1 problem example
@Injectable()
export class CompanyService {
	constructor(@InjectRepository(Company) private readonly companyRepository: Repository<Company>) {}

	// async getCompany(companyId: number) {
	// 	return this.companyRepository.findOneByOrFail({ id: companyId });
	// }

	/**
	 * oneToMany에서 lazy: true인 경우 N + 1 발생
	 */
	async getCompany(companyId: number) {
		const companies = await this.companyRepository.findOneBy({ id: companyId });
		await companies.employees; // N + 1 발생
		return companies;
	}

	updateCompany(company: UpdateCompanyDto) {
		return this.companyRepository.save(company);
	}

	/**
	 * Anti-Pattern
	 * oneToMany에서 lazy: true인 경우 N + 1 발생
	 */
	// async listAllCompanies() {
	// 	const companies = this.companyRepository.find();
	// 	for (const company of await companies) {
	// 		await company.employees;
	// 	}
	// 	return companies;
	// }

	/**
	 * eager: true
	 */
	async listAllCompanies() {
		return this.companyRepository.find();
	}

	/**
	 * N + 1 문제 `relations` 옵션으로 해결하기
	 *
	 * SELECT `Company`.`id` AS `Company_id`, `Company`.`name` AS `Company_name`, `Company__Company_employees`.`id` AS `Company__Company_employees_id`, `Company__Company_employees`.`name` AS `Company__Company_employees_name`, `Company__Company_employees`.`companyId` AS `Company__Company_employees_companyId` FROM `company` `Company` LEFT JOIN `employee` `Company__Company_employees` ON `Company__Company_employees`.`companyId`=`Company`.`id`
	 */
	// listAllCompanies() {
	// 	return this.companyRepository.find({
	// 		relations: ['employees']
	// 	});
	// }

	/**
	 * N + 1 문제 `queryBuilder` 옵션으로 해결하기
	 * SELECT `company`.`id` AS `company_id`, `company`.`name` AS `company_name`, `employees`.`id` AS `employees_id`, `employees`.`name` AS `employees_name`, `employees`.`companyId` AS `employees_companyId` FROM `company` `company` LEFT JOIN `employee` `employees` ON `employees`.`companyId`=`company`.`id`
	 */
	// listAllCompanies() {
	// 	return this.companyRepository
	// 		.createQueryBuilder('company')
	// 		.leftJoinAndSelect('company.employees', 'employees')
	// 		.getMany();
	// }
}
