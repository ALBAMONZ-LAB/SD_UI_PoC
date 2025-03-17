import { IsString, IsInt } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateEventPageInput {
  @Field(() => Int)
  @IsInt()
  eventId: number;

  @IsString()
  pageJson: string;
}
