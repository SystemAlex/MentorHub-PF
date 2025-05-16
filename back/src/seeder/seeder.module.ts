import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { CategoriesModule } from '../categorias/categoria.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../entities/categorias.entities';
import { Professor } from '../entities/profesor.entities';


@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Professor]),
    CategoriesModule,
    
  ],
  providers: [SeederService],
})
export class SeederModule {}
