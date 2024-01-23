import { Field, InputType } from '@nestjs/graphql';
@InputType()
export default class Login {
  @Field()
  email: string;

  @Field()
  password: string;
}