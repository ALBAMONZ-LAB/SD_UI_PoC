import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommonResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;
}
