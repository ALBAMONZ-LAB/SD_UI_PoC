import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateEventPageInput {
  @Field()
  eventId: number;

  @Field(() => String)
  pageJson: string; // GraphQL에서는 Object 타입을 JSON String으로 받음
}
