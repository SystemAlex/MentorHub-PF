import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Class } from '../classes/class.entity';
import { Submission } from '../submission/submission.entity';
import { User } from '../users/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text')
  instructions!: string;

  @Column({ type: 'timestamp' })
  dueDate!: Date;

  @Column({ default: 'pending' })
  status!: string;

  @ManyToOne(() => Class, (cls) => cls.tasks)
  classRef!: Class;

  @ManyToOne(() => User, (user) => user.tasks, { eager: true }) // Aquí agregamos el estudiante
  student!: User;

  @OneToMany(() => Submission, (submission) => submission.task)
  submissions!: Submission[];

  @CreateDateColumn()
  createdAt!: Date;
}
