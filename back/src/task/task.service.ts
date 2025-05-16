import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { Class } from '../classes/class.entity';
import { User } from '../users/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
  ) {}

  // 👨‍🏫 Crear tarea (solo si el profesor es dueño de la clase)
  async createByTeacher(teacherId: string, dto: CreateTaskDto): Promise<Task> {
    const classRef = await this.classRepository.findOne({
      where: { id: dto.classId },
      relations: ['teacher'],
    });

    if (!classRef || classRef.teacher.id !== teacherId) {
      throw new ForbiddenException('No puedes crear tareas para esta clase');
    }

    const task = this.taskRepository.create({
      title: dto.title,
      instructions: dto.instructions,
      dueDate: new Date(dto.dueDate),
      classRef,
    });

    return this.taskRepository.save(task);
  }

  // 👨‍🏫 Ver tareas del profesor
  async findByTeacher(teacherId: string): Promise<Task[]> {
    return this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.classRef', 'class')
      .where('class.teacherId = :teacherId', { teacherId })
      .getMany();
  }

  // 🧑‍🎓 Ver tareas del estudiante
  async findByStudent(studentId: string): Promise<Task[]> {
    return this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.classRef', 'class')
      .leftJoin('class.students', 'student')
      .where('student.id = :studentId', { studentId })
      .getMany();
  }

  // 👨‍🏫 Borrar tarea (solo si el profesor es dueño)
  async deleteIfOwnedByTeacher(
    teacherId: string,
    taskId: number,
  ): Promise<void> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['classRef', 'classRef.teacher'],
    });

    if (!task) throw new NotFoundException('Tarea no encontrada');
    if (task.classRef.teacher.id !== teacherId) {
      throw new ForbiddenException('No puedes borrar esta tarea');
    }

    await this.taskRepository.remove(task);
  }

  // (Opcional) 🛠️ Buscar una tarea específica
  async findOne(taskId: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['classRef'],
    });
    if (!task) throw new NotFoundException('Tarea no encontrada');
    return task;
  }
}
 
