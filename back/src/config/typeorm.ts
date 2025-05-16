// src/config/typeorm.ts
import { DataSourceOptions, DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

import { User } from '../users/user.entity';
import { Class } from '../classes/class.entity';
import { Task } from '../task/task.entity';
import { Submission } from '../submission/submission.entity';
import { Payment } from '../payment/payment.entity';
import { Category } from '../entities/categorias.entities';
import { Professor } from '../entities/profesor.entities';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Class, Task, Submission, Payment, Category, Professor],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
};

const AppDataSource = new DataSource(dataSourceOptions);
export default AppDataSource;
