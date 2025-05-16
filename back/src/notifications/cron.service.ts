import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual } from 'typeorm';
import { Task } from '../task/task.entity';
import { Notification } from '../notifications/notification.entity';
import { User } from '../users/user.entity'; // Necesario para relación

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_7AM)
  async handleDailyNotifications() {
    this.logger.log('⏰ Verificando tareas pendientes...');

    const today = new Date();
    const pendingTasks = await this.taskRepository.find({
      where: {
        ...(Object.prototype.hasOwnProperty.call(this.taskRepository.metadata.propertiesMap, 'status') && { status: 'pending' }),
        ...(Object.prototype.hasOwnProperty.call(this.taskRepository.metadata.propertiesMap, 'dueDate') && { dueDate: LessThanOrEqual(today) }),
      },
      relations: ['student'],
    });

    if (pendingTasks.length === 0) {
      this.logger.log('✅ No hay tareas pendientes hoy.');
      return;
    }

    for (const task of pendingTasks) {
      const message = `Tienes pendiente: ${task.title} (fecha límite: ${task.dueDate.toDateString()})`;

      // Log en consola
      console.log(`📢 ${task.student?.fullName} tiene pendiente: ${task.title} (fecha límite: ${task.dueDate})`);

      // Guardar notificación
      await this.notificationRepository.save({
        user: task.student,
        message,
      });
    }
  }
}
