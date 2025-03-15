import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateEventPageInput {
  @ApiProperty({ example: 1, description: '이벤트 ID' })
  @Field()
  eventId: number;

  @ApiProperty({ example: '{"title": "Event Title"}', description: '이벤트 페이지 JSON 데이터' })
  @Field(() => String)
  pageJson: string; // GraphQL에서는 Object 타입을 JSON String으로 받음
}
