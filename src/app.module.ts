import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './domain/company/company.entity';
import { CompanyModule } from './domain/company/company.module';
import { Employee } from './domain/employee/employee.entity';
import { EmployeeModule } from './domain/employee/employee.module';
import { DataSource } from 'typeorm';
import { onErrorResumeNextWith } from 'rxjs';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forFeature([Company, Employee]),
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			entities: [Company, Employee],
			synchronize: true,
			logging: true
		}),
		CompanyModule,
		EmployeeModule
	]
})
export class AppModule implements OnModuleInit {
	constructor(private readonly dataSource: DataSource) {}

	async onModuleInit() {
		await this.seed();
	}

	private async seed() {
		const companyRepository = this.dataSource.getRepository(Company);
		const employeeRepository = this.dataSource.getRepository(Employee);

		const companiesWithEmployees = [
			{
				id: 1,
				name: 'Company A',
				employees: [{ name: 'Employee A1' }, { name: 'Employee A2' }, { name: 'Employee A3' }]
			},
			{
				id: 2,
				name: 'Company B',
				employees: [{ name: 'Employee B1' }, { name: 'Employee B2' }, { name: 'Employee B3' }]
			},
			{
				id: 3,
				name: 'Company C',
				employees: [{ name: 'Employee C1' }, { name: 'Employee C2' }, { name: 'Employee C3' }]
			},
			{
				id: 4,
				name: 'Company D',
				employees: [{ name: 'Employee D1' }, { name: 'Employee D2' }, { name: 'Employee D3' }]
			}
		];
		await employeeRepository.delete({});
		await companyRepository.delete({});

		for (const company of companiesWithEmployees) {
			const newCompany = companyRepository.create({ id: company.id, name: company.name });
			await companyRepository.save(newCompany);
			const employeesEntities = await Promise.all(
				company.employees.map(async (employee) => {
					const newEmployee = employeeRepository.create(employee);
					newEmployee.company = newCompany;
					return newEmployee;
				})
			);
			await employeeRepository.save(employeesEntities);
		}
	}
}
