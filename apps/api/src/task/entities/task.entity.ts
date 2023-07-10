import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Field(() => String, { description: 'Example field (placeholder)' })
  title: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  content: string;

  @Field(() => Boolean, { description: 'Example field (placeholder)' })
  done: boolean;

  @Field(() => String, { description: 'Example field (placeholder)' })
  created_at: string;
}
