import { ApiProperty } from '@nestjs/swagger';
import { Class } from '../classes/class.entity';
import { Submission } from '../submission/submission.entity';

export class ProductResponseDto {
  @ApiProperty({ description: 'ID único del producto', example: 1 })
  id: number;

  @ApiProperty({ description: 'Título del producto', example: 'Tarea 1: Relaciones en TypeORM' })
  title: string;

  @ApiProperty({ description: 'Instrucciones de la tarea', example: 'Crear una entidad con relaciones ManyToOne' })
  instructions: string;

  @ApiProperty({
    description: 'Fecha límite de entrega en formato ISO',
    example: '2025-05-20T23:59:00.000Z',
  })
  dueDate: Date;

  @ApiProperty({
    description: 'Fecha de creación del producto',
    example: '2025-05-10T10:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Clase asociada a la tarea',
    type: () => Class, // ⚠️ Opcionalmente puedes mapear esto a un DTO también
  })
  classRef: Class;

  @ApiProperty({
    description: 'Lista de entregas hechas por los estudiantes',
    type: () => [Submission], // ⚠️ También puedes usar SubmissionDto si lo tienes
  })
  submissions: Submission[];
}