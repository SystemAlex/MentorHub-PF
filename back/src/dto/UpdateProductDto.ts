import { IsOptional, IsString, IsDateString, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({
    description: 'Nuevo título del producto',
    example: 'Tarea 1 actualizada: Relaciones avanzadas en TypeORM',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Nuevas instrucciones para la tarea',
    example: 'Actualiza la tarea para incluir relaciones ManyToMany en NestJS.',
  })
  @IsOptional()
  @IsString()
  instructions?: string;

  @ApiPropertyOptional({
    description: 'Nueva fecha límite de entrega',
    example: '2025-05-25T23:59:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiPropertyOptional({
    description: 'ID actualizado de la clase relacionada',
    example: 2,
  })
  @IsOptional()
  @IsNumber()
  classRefId?: number;
}
