// create-class.dto.ts
import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1) 
  teacherId!: number;
}
