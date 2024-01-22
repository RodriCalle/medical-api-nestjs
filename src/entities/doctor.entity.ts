import { Appointment } from 'src/entities/appointment.entity';
import { User } from 'src/entities/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Speciality } from './speciality.entity';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.doctor)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Speciality, (speciality) => speciality.doctors)
  speciality: Speciality;

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment[];
}
