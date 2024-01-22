import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Appointment } from './appointment.entity';

@Entity()
export class AppointmentDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  diagnosis: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  treatment: string;

  @OneToOne(() => Appointment, (appointment) => appointment.detail)
  @JoinColumn()
  appointment: Appointment;
}
