import { IsString } from 'class-validator';

export class UpdateCompanyDto {
	@IsString()
	name: string;
}
