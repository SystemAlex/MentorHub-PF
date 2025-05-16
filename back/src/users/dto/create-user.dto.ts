import { IsEmail, IsString, MinLength, IsIn, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  fullName!: string;

  @IsEmail()
  email!: string;

  @IsPhoneNumber(undefined)
  phoneNumber!: string;

  @IsString()
  @IsNotEmpty()
  country!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsIn(['admin', 'teacher', 'student'])
  role!: 'admin' | 'teacher' | 'student';
}
