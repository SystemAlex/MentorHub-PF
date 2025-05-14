import { IsOptional, IsEnum, IsString } from 'class-validator';

export class UpdatePaymentDto {
  @IsOptional()
  @IsEnum(['student_subscription', 'teacher_monthly_fee'])
  type?: 'student_subscription' | 'teacher_monthly_fee';

  @IsOptional()
  @IsString()
  status?: 'pending' | 'completed' | 'failed';
}