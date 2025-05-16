import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfessorDto {
  @ApiProperty({
    example: 'Carlos Gómez',
    description: 'Nombre completo del profesor',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Especialista en matemáticas avanzadas',
    description: 'Descripción o biografía del profesor',
    required: false,
  })
  @IsOptional()
  @IsString()
  bio?: string;
}

