import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { User } from '../users/user.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(userId: number, dto: CreatePaymentDto): Promise<Payment> {
    let user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const payment = this.paymentRepo.create({ ...dto, user, status: 'completed' });
    return await this.paymentRepo.save(payment);
  }

  async findByUser(userId: number): Promise<Payment[]> {
    return this.paymentRepo.find({ where: { user: { id: userId } } });
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepo.find();
  }

  async update(id: number, dto: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.paymentRepo.preload({ id, ...dto });
    if (!payment) throw new NotFoundException('Pago no encontrado');
    return this.paymentRepo.save(payment);
  }

  async remove(id: number): Promise<void> {
    const result = await this.paymentRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Pago no encontrado');
  }
}