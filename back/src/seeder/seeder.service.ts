import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/categorias.entities';
import { Professor } from '../entities/profesor.entities';
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,

    @InjectRepository(Professor)
    private readonly professorRepo: Repository<Professor>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedCategories();
    await this.seedProfessors();
  }

  async seedCategories() {
    const filePath = path.join(__dirname, 'categorias.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const existing = await this.categoryRepo.find();
    if (existing.length === 0) {
      await this.categoryRepo.save(this.categoryRepo.create(data));
      console.log('✅ Categorías precargadas');
    } else {
      console.log('ℹ️ Categorías ya existen');
    }
  }

  async seedProfessors() {
    const filePath = path.join(__dirname, 'profesores.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const existing = await this.professorRepo.find();
    if (existing.length === 0) {
      await this.professorRepo.save(this.professorRepo.create(data));
      console.log('✅ Profesores precargados');
    } else {
      console.log('ℹ️ Profesores ya existen');
    }
  }
}

