import { Field, InputType } from '@nestjs/graphql';
@InputType()
export default class CreateUser {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  avatar: string;
}