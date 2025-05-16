import { IsString, Length, IsEnum } from 'class-validator';
import { Role } from '../decorator/roles.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Carlos Gómez',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'carlos@example.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario (mínimo 6, máximo 20 caracteres)',
    example: 'Carlos123*',
    minLength: 6,
    maxLength: 20,
  })
  @IsString()
  @Length(6, 20)
  password: string;

  @ApiProperty({
    description: 'Rol del usuario',
    enum: Role,
    example: Role.USER,
  })
  @IsEnum(Role)
  role: Role;
}