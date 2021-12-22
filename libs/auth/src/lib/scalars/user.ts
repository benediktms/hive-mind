import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class User {
  @Field()
  id!: number;

  @Field()
  email!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;
}
