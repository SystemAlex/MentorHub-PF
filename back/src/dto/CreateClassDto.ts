import { IsString, IsNotEmpty, IsArray, IsNumber,IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClassDto {
  @ApiProperty({
    description: 'Título de la clase',
    example: 'Curso de NestJS Avanzado',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Descripción detallada de la clase',
    example: 'Este curso cubre NestJS con TypeORM, autenticación, y despliegue en producción.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'ID del profesor que dicta la clase',
    example: 3,
  })
  @IsNumber()
  teacherId: string;

  @ApiProperty({ example: 'uuid-de-categoria' })
  @IsUUID()
  categoryId: string; // 👈 Añadido como obligatorio


}
