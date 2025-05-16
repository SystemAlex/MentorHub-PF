import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksService } from './task.service';
import { TasksController } from './tasks.controller';
import { Class } from '../classes/class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Class])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
