import { Doctor } from 'src/entities/doctor.entity';
import { Audit } from 'src/shared/audit.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Appointment } from './appointment.entity';

@Entity()
export class Speciality extends Audit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;
  @Column({ length: 400 })
  description: string;
  @Column({ type: 'bit', default: 1 })
  status: boolean;

  @OneToMany(() => Appointment, (appointment) => appointment.speciality)
  appointments: Appointment[];

  @OneToMany(() => Doctor, (doctor) => doctor.speciality)
  doctors: Doctor[];
}
