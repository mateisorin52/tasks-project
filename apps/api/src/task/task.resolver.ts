import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/JwtAuthGuard';
import { UserId } from '../app/decorators/UserIdDecorator';
import { TaskFilters } from './dto/task-filters.input';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => Task)
  @UseGuards(JwtAuthGuard)
  CreateTaskMutation(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
    @UserId() userId: number
  ) {
    return this.taskService.create(createTaskInput, userId);
  }

  @Query(() => [Task], { name: 'TasksQuery' })
  @UseGuards(JwtAuthGuard)
  TasksQuery(
    @Args('filters', { nullable: true }) filters: TaskFilters,
    @UserId() userId: number
  ) {
    return this.taskService.findAll(userId, filters);
  }

  @Query(() => Task, { name: 'TaskQuery' })
  TaskQuery(@Args('id', { type: () => Int }) id: number) {
    return this.taskService.findOne(id);
  }

  @Mutation(() => Task)
  UpdateTaskMutation(
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput
  ) {
    return this.taskService.update(updateTaskInput.id, updateTaskInput);
  }

  @Mutation(() => Task)
  RemoveTaskMutation(@Args('id', { type: () => Int }) id: number) {
    return this.taskService.remove(id);
  }
}
