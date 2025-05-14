import { IsEmail, IsString, MinLength, IsIn, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class RegisterDto {
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

  @IsString()
  role!: string;
}
