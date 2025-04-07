import { IsString, IsNotEmpty, IsBoolean, IsDateString } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UpdateEventPageInput {
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

@InputType()
export class UpdateEventPageGQLInput {
  @Field(() => Int)
  @IsNotEmpty()
  id: number;
  @Field()
  @IsString()
  @IsNotEmpty()
  eventTitle: string;
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  pageJson: string;
  @Field()
  @IsBoolean()
  isPublished: boolean;
  @Field()
  @IsDateString()
  eventStartDate: string;
  @Field()
  @IsDateString()
  eventEndDate: string;
}
