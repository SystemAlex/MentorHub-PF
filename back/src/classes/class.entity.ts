import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Task } from '../task/task.entity';
import { Category } from '../entities/categorias.entities'; 

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @ManyToOne(() => User, (user) => user.classesTaught)
  teacher!: User;

  @ManyToMany(() => User, (user) => user.classesEnrolled)
  @JoinTable()
  students!: User[];

  @OneToMany(() => Task, (task) => task.classRef)
  tasks!: Task[];

  @ManyToOne(() => Category, (category) => category.classes)
  category!: Category; // <--- esta línea soluciona el error

  @CreateDateColumn()
  createdAt!: Date;
}

