import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { Class } from '../classes/class.entity';
import { Submission } from '../submission/submission.entity';
import { Payment } from '../payment/payment.entity';
import { Task } from '../task/task.entity'; // 👈 Importación agregada
import { Notification } from '../notifications/notification.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fullName!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: 'student' }) // 'admin', 'teacher', 'student'
  role!: 'admin' | 'teacher' | 'student';

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  country?: string;

  @OneToMany(() => Class, (cls) => cls.teacher)
  classesTaught!: Class[];

  @OneToMany(() => Payment, (payment: Payment) => payment.user)
  payments!: Payment[];

  @ManyToMany(() => Class, (cls) => cls.students)
  @JoinTable()
  classesEnrolled!: Class[];

  @OneToMany(() => Submission, (submission) => submission.student)
  submissions!: Submission[];

  @OneToMany(() => Task, (task) => task.student) // 👈 Relación agregada
  tasks!: Task[];

  @OneToMany(() => Notification, (n) => n.user)
notifications: Notification[];

  @CreateDateColumn()
  createdAt!: Date;
}
