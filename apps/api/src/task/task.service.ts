import { Injectable, Search } from '@nestjs/common';
import { PrismaService } from '../app/PrismaService/PrismaService';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTaskInput: CreateTaskInput, userId: number) {
    console.log(userId);
    return this.prisma.task.create({
      data: { ...createTaskInput, user: { connect: { id: userId } } },
    });
  }

  findAll(
    userId: number,
    filters?: { sortByDate?: 'asc' | 'desc'; search?: string }
  ) {
    console.log(userId);
    return this.prisma.task.findMany({
      where: { AND: [{ userId, title: { contains: filters?.search } }] },
      orderBy: { created_at: filters?.sortByDate || 'asc' },
    });
  }

  findOne(id: number) {
    return this.prisma.task.findUnique({ where: { id } });
  }

  update(id: number, updateTaskInput: UpdateTaskInput) {
    return this.prisma.task.update({ where: { id }, data: updateTaskInput });
  }

  async remove(id: number) {
    return this.prisma.task.delete({ where: { id } });
  }
}
