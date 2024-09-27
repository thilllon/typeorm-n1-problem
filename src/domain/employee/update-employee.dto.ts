import { IsNumber, IsString } from 'class-validator';

export class UpdateEmployeeDto {
	@IsString()
	name: string;

	@IsNumber()
	companyId: number;
}
