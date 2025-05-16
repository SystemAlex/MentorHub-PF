import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Salud', description: 'Nombre de la categoría' })
  @IsString()
  name: string;
}