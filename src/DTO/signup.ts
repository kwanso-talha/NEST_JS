import { Field, InputType } from '@nestjs/graphql';
@InputType()
export default class Signup {
  @Field()
  email: string;

  @Field()
  password: string;
}