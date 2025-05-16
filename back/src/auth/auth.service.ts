import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ token: string }> {
    const { fullName, email, phoneNumber, country, password, role } = registerDto;
    const hashedPassword = await hash(password, 10);

    const newUser = this.usersRepository.create({
      fullName,
      email,
      phoneNumber,
      country,
      password: hashedPassword,
      role: role as 'admin' | 'teacher' | 'student',
    });

    await this.usersRepository.save(newUser);

    const token = this.generateToken(newUser);
    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const token = this.generateToken(user);
    return { token };
  }

  generateToken(user: User): string {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return this.jwtService.sign(payload);
  }
}

