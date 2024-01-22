import { Appointment } from 'src/entities/appointment.entity';
import { MedicalRecord } from 'src/entities/medical-record.entity';
import { User } from 'src/entities/user.entity';
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.patient)
  @JoinColumn()
  user: User;

  @OneToMany(() => Appointment, (appointment) => appointment.patient, {
    cascade: true,
  })
  appointments: Appointment[];

  @OneToOne(() => MedicalRecord, (medicalRecord) => medicalRecord.patient, {
    cascade: true,
  })
  @JoinColumn()
  medicalRecord: MedicalRecord;
}
