import { IsOptional, IsString, IsUUID, IsInt } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateClassDto {
  @ApiPropertyOptional({ example: 'Nueva clase de programación' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Aprenderemos JavaScript desde cero' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 1, description: 'ID del nuevo profesor' })
  @IsOptional()
  @IsInt()
  teacherId?: string;

  @ApiPropertyOptional({ example: 'uuid-de-categoria', description: 'ID de la nueva categoría' })
  @IsOptional()
  @IsUUID()
  categoryId?: string;
}

  