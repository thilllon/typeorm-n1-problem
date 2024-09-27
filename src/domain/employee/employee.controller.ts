import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UpdateEmployeeDto } from './update-employee.dto';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
	constructor(private readonly employeeService: EmployeeService) {}

	@Get()
	getAllEmployee() {
		return this.employeeService.getAllEmployee();
	}

	@Get('single')
	getEmployee(@Query('employeeId') employeeId: number) {
		return this.employeeService.getEmployee(employeeId);
	}

	@Post()
	updateEmployee(@Body() body: UpdateEmployeeDto) {
		return this.employeeService.updateEmployee(body);
	}
}
