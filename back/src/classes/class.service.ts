import { Injectable, NotFoundException } from '@nestjs/common';
import { Class } from './class.entity';
import { User } from '../users/user.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassesService {
  private classes: Class[] = [];
  private nextId = 1;

  async create(createDto: CreateClassDto): Promise<Class> {
    const { title, description, teacherId } = createDto;

    // Profesor simulado (fake)
    const teacher: User = {
      id: teacherId,
      fullName: 'Fake Teacher',
      email: 'fake@teacher.com',
      password: 'fakepass',
      role: 'teacher',
      classesTaught: [],
      classesEnrolled: [],
      submissions: [],
      payments: [],  
      createdAt: new Date(),
    };

    const newClass: Class = {
      id: this.nextId++,
      title,
      description,
      teacher,
      students: [],
      tasks: [],
      createdAt: new Date(),
    };

    this.classes.push(newClass);
    return newClass;
  }

  async update(id: number, updateDto: UpdateClassDto): Promise<Class> {
    const classToUpdate = this.classes.find((c) => c.id === id);
    if (!classToUpdate) throw new NotFoundException('Curso no encontrado');

    Object.assign(classToUpdate, updateDto);
    return classToUpdate;
  }

  async findAll(): Promise<Class[]> {
    return this.classes;
  }

  async findOne(id: number): Promise<Class> {
    const found = this.classes.find((c) => c.id === id);
    if (!found) throw new NotFoundException(`Curso con ID ${id} no encontrado`);
    return found;
  }

  async remove(id: number): Promise<void> {
    const index = this.classes.findIndex((c) => c.id === id);
    if (index === -1) throw new NotFoundException('Curso no encontrado');
    this.classes.splice(index, 1);
  }
}
