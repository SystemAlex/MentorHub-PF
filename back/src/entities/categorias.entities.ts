    import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
    import { Class } from '../classes/class.entity';

    @Entity()
    export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Class, (cls) => cls.category)
    classes: Class[];
    }
