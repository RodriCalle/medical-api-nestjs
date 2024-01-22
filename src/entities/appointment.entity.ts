import { Doctor } from 'src/entities/doctor.entity';
import { Patient } from 'src/entities/patient.entity';
import { Audit } from 'src/shared/audit.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppointmentDetail } from './appointment-detail.entity';
import { AppointmentStatus } from 'src/shared/enums';
import { Speciality } from './speciality.entity';

@Entity()
export class Appointment extends Audit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
  @Column()
  date: Date;

  @Column({
    type: 'varchar',
    length: 50,
    default: AppointmentStatus.ACCEPTED,
  })
  status: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  doctor: Doctor;

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  patient: Patient;

  @OneToOne(() => AppointmentDetail, (detail) => detail.appointment, {
    cascade: true,
  })
  detail: AppointmentDetail;

  @ManyToOne(() => Speciality, (speciality) => speciality.appointments)
  speciality: Speciality;

  // @ManyToOne(() => MedicalRecord, (medicalRecord) => medicalRecord.appointments)
  // medicalRecord: MedicalRecord;
}
