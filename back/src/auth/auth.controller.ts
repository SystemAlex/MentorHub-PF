// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Get,
  Req,
  UseGuards,
  BadRequestException,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport'; 
import { CloudinaryFileInterceptor } from '../common/interceptors/cloudinary.interceptor';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  @Post('register')
  @UseInterceptors(CloudinaryFileInterceptor('profileImage'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Registrar un nuevo usuario con foto' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        phoneNumber: { type: 'string' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string' },
        confirmPassword: { type: 'string' },
        avatarId: { type: 'integer' },
        studies: { type: 'string' },
        role: { type: 'string', enum: ['student', 'teacher', 'admin'] },
        country: { type: 'string' },
        province: { type: 'string' },
        location: { type: 'string' },
        profileImage: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o usuario ya existe' })
  async register(
    @Body() dto: RegisterDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.authService.register(dto, file?.path);
  }
  @Get('confirm-email')
async confirmEmail(@Query('token') token: string) {
  try {
    const payload = this.jwtService.verify(token, { secret: process.env.JWT_EMAIL_SECRET });
    const user = await this.userRepository.findOneBy({ email: payload.email });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    user.isEmailConfirmed = true;
    await this.userRepository.save(user);

    return { message: 'Correo confirmado correctamente' };
  } catch (err) {
    throw new BadRequestException('Token inválido o expirado');
  }
}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso, retorna el token' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // 🔹 INICIO del flujo OAuth
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubLogin() {}

  // 🔹 CALLBACK de los providers
@Get('google/redirect')
@UseGuards(AuthGuard('google'))
googleRedirect(@Req() req: any) {
  return this.authService.handleOAuthLogin(req.user, 'google');
}


  @Get('github/redirect')
  @UseGuards(AuthGuard('github'))
  githubRedirect(@Req() req: any) {
    return this.authService.handleOAuthLogin(req.user, 'github');
  }
}

