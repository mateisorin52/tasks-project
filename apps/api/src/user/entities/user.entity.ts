import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;
  @Field(() => String, { description: 'Example field (placeholder)' })
  fname: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  lname: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  email: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  password: string;
}
