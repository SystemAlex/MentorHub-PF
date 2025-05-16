import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submission } from './submission.entity';
import { CreateSubmissionDto } from './dto/CreateSubmissions.dto';
import { UpdateSubmissionDto } from './dto/updatesubmission.dto';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(Submission)
    private submissionsRepo: Repository<Submission>,
  ) {}

  async create(dto: CreateSubmissionDto, studentId: number) {
    const submission = this.submissionsRepo.create({
      content: dto.content,
      student: { id: studentId },
      task: { id: dto.taskId },
    });
    return this.submissionsRepo.save(submission);
  }

  findAll() {
    return this.submissionsRepo.find();
  }

  findOne(id: number) {
    return this.submissionsRepo.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateSubmissionDto) {
    const submission = await this.submissionsRepo.findOne({ where: { id } });
    if (!submission) throw new NotFoundException('Submission not found');

    Object.assign(submission, dto);
    return this.submissionsRepo.save(submission);
  }

  async remove(id: number) {
    const submission = await this.submissionsRepo.findOne({ where: { id } });

    if (!submission) {
      throw new NotFoundException(`Submission with id ${id} not found`);
    }
  
    return this.submissionsRepo.remove(submission);
  }

  async findByStudent(studentId: number) {
    return this.submissionsRepo.find({ where: { student: { id: studentId } } });
  }

  async findByTask(taskId: number) {
    return this.submissionsRepo.find({ where: { task: { id: taskId } } });
  }
}
