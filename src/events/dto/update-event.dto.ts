import { IsString, IsInt, IsNotEmpty } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UpdateEventPageInput {
  @ApiProperty({ example: 1, description: '이벤트 ID' })
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 'Spring Festival', description: '이벤트 제목' })
  @Field()
  @IsString()
  @IsNotEmpty()
  eventTitle: string;

  @ApiProperty({ example: '{"title": "Event Title"}', description: '이벤트 페이지 JSON 데이터' })
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  pageJson: string;
}
