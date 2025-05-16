import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Task } from '../task/task.entity';

@Entity()
export class Submission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string; // Puede ser texto o una URL (archivo)

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.submissions, { eager: true })
  student: User;

  @ManyToOne(() => Task, (task) => task.submissions, { eager: true })
  task: Task;

  @Column({ nullable: true })
  grade?: number;

  @Column({ nullable: true })
  feedback?: string;

  @Column({ default: false })
  isGraded: boolean;
}
