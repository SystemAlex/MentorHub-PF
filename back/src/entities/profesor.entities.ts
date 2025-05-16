import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Class } from '../classes/class.entity';

@Entity()
export class Professor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  bio?: string;

  @OneToMany(() => Class, (cls) => cls.teacher)
    classes: Class[];
}
