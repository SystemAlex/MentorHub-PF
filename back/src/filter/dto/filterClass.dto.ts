// src/classes/dto/filter-classes.dto.ts
import { IsOptional, IsString, IsUUID, IsIn, IsInt, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterClassesDto {
  @ApiPropertyOptional({ description: 'Buscar por nombre (parcial)', example: 'Yoga' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'ID de categoría', example: 'uuid-categoria' })
  @IsOptional()
  @IsUUID()
  category?: string;

  @ApiPropertyOptional({ description: 'ID del profesor (teacher)', example: 'uuid-teacher' })
  @IsOptional()
  @IsUUID()
  teacherId?: string; // 🔁 CAMBIADO de professorId a teacherId

  @ApiPropertyOptional({ description: 'Campo por el cual ordenar', example: 'title' })
  @IsOptional()
  @IsIn(['title', 'createdAt']) // 🔁 CAMBIADO 'name' a 'title' (según tu entidad)
  sortBy?: string;

  @ApiPropertyOptional({ description: 'Orden asc o desc', example: 'asc' })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';

  @ApiPropertyOptional({ description: 'Página', example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ description: 'Cantidad por página', example: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;
}

