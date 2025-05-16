// src/payment/payment.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

export enum PaymentType {
  STUDENT_SUBSCRIPTION = 'student_subscription',
  TEACHER_MONTHLY_FEE = 'teacher_monthly_fee',
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.payments, { eager: true })
  user!: User;

  @Column('decimal', { precision: 10, scale: 2 })
  amount!: number;

  @Column()
  currency!: string;

  @Column({ type: 'enum', enum: PaymentType })
  type!: PaymentType;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status!: PaymentStatus;

  @CreateDateColumn()
  createdAt!: Date;
}

