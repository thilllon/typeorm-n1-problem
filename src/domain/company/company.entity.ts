import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from '../employee/employee.entity';

@Entity()
export class Company {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('varchar')
	name: string;

	@OneToMany(() => Employee, (employee) => employee.company, {
		onDelete: 'CASCADE',
		lazy: true,
		eager: true
	})
	employees: Promise<Employee[]>;
}
