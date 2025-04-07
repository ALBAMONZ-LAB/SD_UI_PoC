import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateEventPageInput {
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
  @ApiProperty({ example: true, description: '게재 여부' })
  @Field()
  @IsBoolean()
  isPublished: boolean;

  @ApiProperty({
    example: '2025-04-10',
    description: '이벤트 시작 날짜 (yyyy-MM-dd 형식)',
  })
  @Field()
  @IsDateString()
  eventStartDate: string;

  @ApiProperty({
    example: '2025-04-15',
    description: '이벤트 종료 날짜 (yyyy-MM-dd 형식)',
  })
  @Field()
  @IsDateString()
  eventEndDate: string;
}
