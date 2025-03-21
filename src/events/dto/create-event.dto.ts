import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateEventPageInput {
  @ApiProperty({ example: 1, description: '이벤트 ID' })
  @IsNotEmpty()
  @IsInt()
  @Field()
  id: number;

  @ApiProperty({ example: 'Spring Festival', description: '이벤트 제목' })
  @IsNotEmpty()
  @IsString()
  @Field()
  eventTitle: string;

  @ApiProperty({ example: '{"title": "Event Title"}', description: '이벤트 페이지 JSON 데이터' })
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  pageJson: string; // GraphQL에서는 Object 타입을 JSON String으로 받음
}
