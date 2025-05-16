import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class UpdateSubmissionDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsNumber()
  grade?: number;

  @IsOptional()
  @IsString()
  feedback?: string;

  @IsOptional()
  @IsBoolean()
  isGraded?: boolean;
}
