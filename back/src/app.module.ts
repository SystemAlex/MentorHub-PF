// filepath: /Users/gabyaybar/Desktop/PF/MentorHub-PF/back/src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';

import { ChatbotModule } from './chatbot/chatbot.module';
import { ClassesModule } from './classes/classes.module';
import { User } from './users/user.entity';
import { Class } from './classes/class.entity';
import { Submission } from './submission/submission.entity';
import { Task } from './task/task.entity';
import { PaymentsModule } from './payment/payments.module';
import { Payment } from './payment/payment.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';

config(); // Cargar las variables del .env

@Module({
  imports: [
    ChatbotModule,
    ClassesModule,
    PaymentsModule,
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Class,Task, Submission,Payment],
      synchronize: true, // Solo en desarrollo, nunca en producción
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
