import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Audit } from 'src/shared/audit.entity';
import { Doctor } from 'src/entities/doctor.entity';
import { Patient } from 'src/entities/patient.entity';
import { Role } from './role.entity';

@Entity()
@Unique(['email'])
export class User extends Audit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  // @Exclude()
  password: string;

  @Column({ length: 100 })
  name: string;
  @Column({ length: 200 })
  lastname: string;
  @Column({ length: 300 })
  address: string;
  @Column({ length: 20 })
  phone: string;
  @Column({ length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  documentType: string;
  @Column({ length: 20, nullable: true })
  documentNumber: string;

  @Column({ type: 'bit', default: 1 })
  status: boolean;

  @BeforeInsert()
  // @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];

  @OneToOne(() => Doctor, (doctor) => doctor.user, {
    eager: false,
    cascade: true,
  })
  doctor: Doctor;

  @OneToOne(() => Patient, (patient) => patient.user, {
    eager: false,
    cascade: true,
  })
  patient: Patient;
}
