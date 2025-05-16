// src/classes/classes.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { ClassesService } from './filter.service';
import { FilterClassesDto } from './dto/filterClass.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('Clases')
@Controller('filters')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener lista de clases con filtros' })
  @ApiResponse({ status: 200, description: 'Lista paginada de clases' })
  async getClasses(@Query() filter: FilterClassesDto) {
    return this.classesService.findAll(filter);
  }
}

