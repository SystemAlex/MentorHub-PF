import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity';
import { User } from '../users/user.entity';
import { Category } from '../categorias/categorias.entity';
import { Materias } from '../materias/materias.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from '../dto/update-class.dto';
import { cloudinary } from '../config/cloudinary.config';
import { Payment, PaymentStatus, PaymentType } from '../payment/payment.entity';
import { sanitizeName } from '../common/utils/sanitize-name';


@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class) private readonly classRepository: Repository<Class>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Materias) private readonly materiaRepository: Repository<Materias>,
    @InjectRepository(Payment) private readonly paymentRepository: Repository<Payment>,
  ) {}

  async create(createDto: CreateClassDto, files?: Express.Multer.File[]): Promise<Class> {
    console.log('📥 Datos recibidos en create:', createDto);
  
    const { title, description, teacherId, categoryId, materiaId, sector } = createDto;
  
    const teacher = await this.userRepository.findOne({
      where: { id: teacherId, role: 'teacher' },
    });
    if (!teacher) throw new NotFoundException('Profesor no encontrado');
  
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    if (!category) throw new NotFoundException('Categoría no encontrada');
  
    const materia = await this.materiaRepository.findOne({ where: { id: materiaId } });
    if (!materia) throw new NotFoundException('Materia no encontrada');
    /* // Lógica de validación mensual
    const latestPayment = await this.paymentRepository.findOne({
      where: {
        user: { id: teacherId },
        //type: PaymentType.TEACHER_SUBSCRIPTION,
        //status: PaymentStatus.COMPLETED,
      },
      order: { createdAt: 'DESC' },
    });

     (!latestPayment) {
      console.log('⛔ Profesor sin historial de pago mensual');
      throw new ForbiddenException('Debes pagar la suscripción mensual para crear clases.');
    }

    const paymentDate = new Date(latestPayment.createdAt);
    const now = new Date();
    const diffInMs = now.getTime() - paymentDate.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInDays > 30) {
      console.log('⛔ Suscripción expirada hace', diffInDays, 'días');
      throw new ForbiddenException('Tu suscripción ha expirado. Debes renovarla para seguir creando clases.');
    }
*/

    const newClass = this.classRepository.create({
      title,
      description,
      sector,
      materia,
      teacher,
      category,
      multimedia: [],
    });
  
    const savedClass = await this.classRepository.save(newClass);
    console.log('✅ Clase guardada con ID:', savedClass.id);
  
    // 🧼 Nombres para carpetas
    const sanitizedCategory = sanitizeName(category.name);
    const sanitizedMateria = sanitizeName(materia.name);
    const sanitizedTitle = sanitizeName(savedClass.title);
  
    const baseCategoryPath = `categorias/${sanitizedCategory}`;
    const baseMateriaPath = `${baseCategoryPath}/materias/${sanitizedMateria}`;
    const classFolderPath = `${baseMateriaPath}/clases/${sanitizedTitle}-${savedClass.id}`;
  
    // 🧠 Opción híbrida: aseguramos que existan las carpetas base
    try {
      await cloudinary.api.create_folder(baseCategoryPath);
      await cloudinary.api.create_folder(baseMateriaPath);
      await cloudinary.api.create_folder(`${baseMateriaPath}/clases`);
      await cloudinary.api.create_folder(classFolderPath);
    } catch (error) {
      console.warn('⚠️ Error creando carpetas:', error instanceof Error ? error.message : error);
    }
  
    // 📤 Subida de archivos multimedia
    const multimediaUrls: string[] = [];
  
    if (files && files.length > 0) {
      for (const file of files) {
        const uploadResult = await cloudinary.uploader.upload(file.path, {
          folder: classFolderPath,
          resource_type: 'auto',
        });
        multimediaUrls.push(uploadResult.secure_url);
      }
  
      savedClass.multimedia = multimediaUrls;
      await this.classRepository.save(savedClass);
    }
  
    return savedClass;
  }
  

  async update(id: string, updateDto: UpdateClassDto): Promise<Class> {
    console.log('🛠️ Actualizando clase:', id);
    const classToUpdate = await this.classRepository.findOne({ where: { id } });
    if (!classToUpdate) throw new NotFoundException('Clase no encontrada');

    Object.assign(classToUpdate, updateDto);
    return this.classRepository.save(classToUpdate);
  }

  async findAll(): Promise<Class[]> {
    console.log('📚 Buscando todas las clases activas');
    return this.classRepository.find({
      where: { estado: true },
      relations: ['teacher', 'students', 'tasks', 'category'],
    });
  }

  async findOne(id: string): Promise<Class> {
    console.log('🔍 Buscando clase por ID:', id);
    const found = await this.classRepository.findOne({
      where: { id, estado: true },
      relations: ['teacher', 'students', 'tasks', 'category'],
    });
    if (!found) throw new NotFoundException(`Clase con ID ${id} no encontrada`);
    return found;
  }

  async remove(id: string): Promise<void> {
    console.log('🕵️ Buscando clase con ID:', id);
    const classToRemove = await this.classRepository.findOne({ where: { id } });
    if (!classToRemove) throw new NotFoundException('Clase no encontrada');
    classToRemove.estado = false;
    classToRemove.fechaEliminado = new Date();
    await this.classRepository.save(classToRemove);
  }

  async restore(id: string): Promise<Class> {
    console.log('♻️ Restaurando clase ID:', id);
    const classToRestore = await this.classRepository.findOne({ where: { id } });
    if (!classToRestore) throw new NotFoundException('Clase no encontrada');
    classToRestore.estado = true;
    classToRestore.fechaEliminado = undefined;
    return this.classRepository.save(classToRestore);
  }

  async findDeleted(): Promise<Class[]> {
    console.log('🧾 Buscando clases eliminadas');
    return this.classRepository.find({
      where: { estado: false },
      relations: ['teacher', 'students', 'tasks', 'category'],
    });
  }

  async findByTeacher(
    teacherId: string,
    page = 1,
    limit = 10,
  ): Promise<{
    data: Class[];
    total: number;
    page: number;
    limit: number;
  }> {
    console.log('👨‍🏫 Buscando clases del profesor ID:', teacherId);
    
    const teacher = await this.userRepository.findOne({
      where: { id: teacherId, role: 'teacher' },
    });
    if (!teacher) throw new NotFoundException(`Profesor con ID ${teacherId} no encontrado`);
  
    const [data, total] = await this.classRepository.findAndCount({
      where: { teacher: { id: teacherId }, estado: true },
      relations: ['category', 'students', 'tasks'],
      skip: (page - 1) * limit,
      take: limit,
    });
  
    return { data, total, page, limit };
  }


  async findByStudent(studentId: string): Promise<Class[]> {
    console.log('🎓 Buscando clases del estudiante ID:', studentId);
    const student = await this.userRepository.findOne({
      where: { id: studentId, role: 'student' },
    });
    if (!student) throw new NotFoundException(`Estudiante con ID ${studentId} no encontrado`);

    return this.classRepository
      .createQueryBuilder('class')
      .leftJoinAndSelect('class.teacher', 'teacher')
      .leftJoinAndSelect('class.students', 'students')
      .leftJoinAndSelect('class.tasks', 'tasks')
      .leftJoinAndSelect('class.category', 'category')
      .where('class.estado = :estado', { estado: true })
      .andWhere('students.id = :studentId', { studentId })
      .getMany();
  }

  async enrollStudent(classId: string, studentId: string): Promise<Class> {
    console.log('➕ Inscribiendo estudiante ID:', studentId, 'a clase ID:', classId);

    const clase = await this.classRepository.findOne({
      where: { id: classId, estado: true },
      relations: ['students', 'teacher'],
    });
    if (!clase) throw new NotFoundException('Clase no encontrada o inactiva');

    const student = await this.userRepository.findOne({ where: { id: studentId, role: 'student' } });
    if (!student) throw new NotFoundException('Estudiante no encontrado');

    const alreadyEnrolled = clase.students.some((s) => s.id === studentId);
    if (alreadyEnrolled) throw new Error('El estudiante ya está inscrito en esta clase');

    // 🔐 Validar suscripción mensual del estudiante
    const latestPayment = await this.paymentRepository.findOne({
      where: {
        user: { id: studentId },
        type: PaymentType.STUDENT_SUBSCRIPTION,
        status: PaymentStatus.COMPLETED,
      },
      order: { createdAt: 'DESC' },
    });

    if (!latestPayment) {
      console.log('⛔ Estudiante sin historial de pago mensual');
      throw new ForbiddenException('Debes pagar la suscripción mensual para unirte a clases.');
    }

    const paymentDate = new Date(latestPayment.createdAt);
    const now = new Date();
    const diffInMs = now.getTime() - paymentDate.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInDays > 30) {
      console.log('⛔ Suscripción del estudiante expirada hace', Math.floor(diffInDays), 'días');
      throw new ForbiddenException('Tu suscripción ha expirado. Debes renovarla para unirte a clases.');
    }

    console.log('✅ Estudiante tiene suscripción activa. Último pago fue hace', Math.floor(diffInDays), 'días');

    const enrolledCount = await this.classRepository
      .createQueryBuilder('class')
      .leftJoin('class.students', 'student')
      .where('student.id = :studentId', { studentId })
      .getCount();

    if (!student.isPaid && enrolledCount >= 3) {
      console.log('⛔ Estudiante excedió el límite sin plan mensual premium');
      throw new ForbiddenException('Debes pagar la suscripción mensual Premium para unirte a más de 3 clases');
    }

    clase.students.push(student);
    await this.classRepository.save(clase);

    const updatedClass = await this.classRepository.findOne({
      where: { id: classId },
      relations: ['students', 'teacher'],
    });
    if (!updatedClass) throw new NotFoundException('Clase no encontrada después de la inscripción');
    return updatedClass;
  }

  async unenrollStudent(classId: string, studentId: string): Promise<Class> {
    console.log('➖ Desinscribiendo estudiante ID:', studentId, 'de clase ID:', classId);
    const clase = await this.classRepository.findOne({
      where: { id: classId, estado: true },
      relations: ['students'],
    });
    if (!clase) throw new NotFoundException('Clase no encontrada o inactiva');

    const studentIndex = clase.students.findIndex((s) => s.id === studentId);
    if (studentIndex === -1) throw new NotFoundException('El estudiante no está inscrito en esta clase');

    clase.students.splice(studentIndex, 1);
    return this.classRepository.save(clase);
  }

  
}
