import { Patient } from 'src/entities/patient.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MedicalRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;

  @Column()
  description: string;

  @OneToOne(() => Patient, (patient) => patient.medicalRecord)
  patient: Patient;

  // @OneToMany(() => Appointment, (appointment) => appointment.medicalRecord)
  // appointments: Appointment[];
}
