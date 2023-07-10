import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { PrismaService } from '../app/PrismaService/PrismaService';

@Module({
  providers: [TaskResolver, TaskService, PrismaService],
})
export class TaskModule {}
