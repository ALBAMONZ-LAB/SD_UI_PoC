import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateEventHistoryInput {
  @Field()
  eventPageId: number;

  @Field()
  previousPageJson: string;

  @Field()
  changedPageJson: string;

  @Field()
  changeReason: string;

  @Field()
  changedBy: string;
}
