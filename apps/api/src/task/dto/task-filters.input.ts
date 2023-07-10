import { CreateTaskInput } from './create-task.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class TaskFilters {
  @Field(() => String)
  search: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  sortByDate: 'asc' | 'desc';
}
