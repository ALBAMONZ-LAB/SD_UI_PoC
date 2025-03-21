import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateEventHistoryInput {
  @ApiProperty({ example: 1, description: '이벤트 페이지 ID' })
  @IsNotEmpty()
  @IsInt()
  @Field()
  id: number;

  @ApiProperty({ example: '{"title": "Old Title"}', description: '변경 전 페이지 JSON' })
  @IsNotEmpty()
  @IsString()
  @Field()
  previousPageJson: string;

  @ApiProperty({ example: '{"title": "New Title"}', description: '변경 후 페이지 JSON' })
  @IsNotEmpty()
  @IsString()
  @Field()
  changedPageJson: string;

  @ApiProperty({ example: 'Fixed a typo', description: '변경 이유' })
  @IsNotEmpty()
  @IsString()
  @Field()
  changeReason: string;

  @ApiProperty({ example: 'admin', description: '변경한 사람' })
  @IsNotEmpty()
  @IsString()
  @Field()
  changedBy: string;
}
