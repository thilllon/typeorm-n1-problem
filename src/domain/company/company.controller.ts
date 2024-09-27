import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CompanyService } from './company.service';
import { UpdateCompanyDto } from './update-company.dto';

@Controller('company')
export class CompanyController {
	constructor(private readonly companyService: CompanyService) {}

	@Get()
	listAllCompanies() {
		return this.companyService.listAllCompanies();
	}

	@Get('/:companyId')
	getCompany(@Param('companyId') id: number) {
		return this.companyService.getCompany(id);
	}

	@Post()
	updateCompany(@Body() body: UpdateCompanyDto) {
		return this.companyService.updateCompany(body);
	}
}
