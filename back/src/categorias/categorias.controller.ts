import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categorias.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Categorías')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear categoría' })
  @ApiResponse({ status: 201, description: 'Categoría creada' })
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar categorías' })
  findAll() {
    return this.categoriesService.findAll();
  }
}
