import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../company/company.entity';
import { UpdateEmployeeDto } from './update-employee.dto';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeeService {
	constructor(
		@InjectRepository(Employee) private readonly employeeRepository: Repository<Employee>,
		@InjectRepository(Company) private readonly companyRepository: Repository<Company>
	) {}

	getAllEmployee() {
		return this.employeeRepository.find();
	}

	getEmployee(employeeId: number) {
		return this.employeeRepository.findOneBy({ id: employeeId });
	}

	async updateEmployee(setEmployeeDto: UpdateEmployeeDto) {
		const employee = new Employee();
		employee.name = setEmployeeDto.name;
		employee.company = await this.companyRepository.findOneBy({ id: setEmployeeDto.companyId });

		return this.employeeRepository.save(employee);
	}
}
