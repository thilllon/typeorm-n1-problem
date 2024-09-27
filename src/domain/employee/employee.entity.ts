import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from '../company/company.entity';

@Entity()
export class Employee {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('varchar')
	name: string;

	@ManyToOne(() => Company, (company) => company.employees)
	@JoinColumn([{ name: 'companyId', referencedColumnName: 'id' }]) // 여기서 id는 company의 id를 가리킨다.
	company: Company;
}
