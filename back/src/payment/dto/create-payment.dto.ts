import { IsNumber, IsString, IsEnum } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  amount!: number;

  @IsString()
  currency!: string;

  @IsEnum(['student_subscription', 'teacher_monthly_fee'])
  type!: 'student_subscription' | 'teacher_monthly_fee';
}