// src/filter/filter.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from '../classes/class.entity';
import { Repository } from 'typeorm';
import { FilterClassesDto } from './dto/filterClass.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  async findAll(filter: FilterClassesDto) {
    const {
      search,
      category,
      teacherId, // este debería ser renombrado a teacherId si lo quieres más claro
      sortBy = 'title', // asegúrate de que este campo exista en tu entidad
      sortOrder = 'asc',
      page = 1,
      limit = 10,
    } = filter;

    const query = this.classRepository.createQueryBuilder('class')
      .leftJoinAndSelect('class.category', 'category')
      .leftJoinAndSelect('class.teacher', 'teacher'); // ✅ cambio hecho aquí

    if (search) {
      query.andWhere('LOWER(class.title) LIKE LOWER(:search)', { search: `%${search}%` });
    }

    if (category) {
      query.andWhere('category.id = :category', { category });
    }

    if (teacherId) {
    query.andWhere('teacher.id = :teacherId', { teacherId }); // ✅ ahora coinciden
    }

    query.orderBy(`class.${sortBy}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');

    const [results, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: results,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }
}
