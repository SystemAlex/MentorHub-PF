import { IsString, IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  instructions: string;

  @IsDateString()
  dueDate: string;

  @IsNumber()
  classId: number; // ✅ ahora validado
}
