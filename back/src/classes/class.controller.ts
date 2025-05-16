import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ClassesService } from './class.service';
import { CreateClassDto } from '../dto/CreateClassDto';
import { UpdateClassDto } from '../dto/update-class.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Class } from './class.entity';

@ApiTags('Clases')
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva clase' })
  @ApiResponse({ status: 201, description: 'Clase creada exitosamente', type: Class })
  @ApiBody({ type: CreateClassDto })
  create(@Body() createDto: CreateClassDto) {
    return this.classesService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las clases' })
  @ApiResponse({ status: 200, description: 'Lista de clases', type: [Class] })
  findAll() {
    return this.classesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una clase por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Clase encontrada', type: Class })
  @ApiResponse({ status: 404, description: 'Clase no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.classesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una clase' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateClassDto })
  @ApiResponse({ status: 200, description: 'Clase actualizada', type: Class })
  @ApiResponse({ status: 404, description: 'Clase no encontrada' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateClassDto,
  ) {
    return this.classesService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una clase' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Clase eliminada' })
  @ApiResponse({ status: 404, description: 'Clase no encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.classesService.remove(id);
  }
}

