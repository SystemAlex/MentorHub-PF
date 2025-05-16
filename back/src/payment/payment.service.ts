import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus, PaymentType } from './payment.entity';
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

  async create(userId: string, dto: CreatePaymentDto): Promise<Payment> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const payment = this.paymentRepo.create({
      amount: dto.amount,
      currency: dto.currency,
      type: dto.type as PaymentType, // Cast explícito
      status: PaymentStatus.COMPLETED,
      user,
    });

    return await this.paymentRepo.save(payment);
  }

  async findByUser(userId: string): Promise<Payment[]> {
    return this.paymentRepo.find({
      where: { user: { id: userId } },
    });
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepo.find();
  }

  async update(id: number, dto: UpdatePaymentDto): Promise<Payment> {
      const updateData: Partial<Payment> = {};

      if (dto.amount !== undefined) updateData.amount = dto.amount;
      if (dto.currency !== undefined) updateData.currency = dto.currency;
      if (dto.type) updateData.type = dto.type as PaymentType;
      if (dto.status) updateData.status = dto.status as PaymentStatus;


    const payment = await this.paymentRepo.preload({
      id,
      ...updateData,
    });

    if (!payment) throw new NotFoundException('Pago no encontrado');
    return await this.paymentRepo.save(payment);
  }

  async remove(id: number): Promise<void> {
    const result = await this.paymentRepo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Pago no encontrado');
  }
}
