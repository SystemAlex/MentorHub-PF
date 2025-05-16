import { IsString, IsNotEmpty, IsDateString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Título del producto (tarea o actividad)',
    example: 'Tarea 1: Relaciones en TypeORM',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Instrucciones detalladas para la tarea',
    example: 'Crea una entidad con relaciones ManyToOne y OneToMany en NestJS usando TypeORM.',
  })
  @IsString()
  @IsNotEmpty()
  instructions: string;

  @ApiProperty({
    description: 'Fecha límite de entrega en formato ISO',
    example: '2025-05-20T23:59:00.000Z',
  })
  @IsDateString()
  dueDate: string;

  @ApiProperty({
    description: 'ID de la clase a la que pertenece esta tarea',
    example: 1,
  })
  @IsNumber()
  classRefId: number;
}