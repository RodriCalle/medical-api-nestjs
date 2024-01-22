import { Column } from 'typeorm';

export class Audit {
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'int', default: 1 })
  createdBy: number;

  @Column({ type: 'datetime', nullable: true })
  updatedAt: Date;

  @Column({ type: 'int', nullable: true })
  updatedBy: number;
}
