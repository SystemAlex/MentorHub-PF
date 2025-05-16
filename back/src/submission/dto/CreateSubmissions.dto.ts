// src/submission/dto/create-submission.dto.ts
import { IsString, IsInt } from 'class-validator';

export class CreateSubmissionDto {
  @IsString()
  content: string;

  @IsInt()
  taskId: number;
}
