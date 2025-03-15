import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateEventHistoryInput {
  @ApiProperty({ example: 1, description: '이벤트 페이지 ID' })
  @Field()
  eventPageId: number;

  @ApiProperty({ example: '{"title": "Old Title"}', description: '변경 전 페이지 JSON' })
  @Field()
  previousPageJson: string;

  @ApiProperty({ example: '{"title": "New Title"}', description: '변경 후 페이지 JSON' })
  @Field()
  changedPageJson: string;

  @ApiProperty({ example: 'Fixed a typo', description: '변경 이유' })
  @Field()
  changeReason: string;

  @ApiProperty({ example: 'admin', description: '변경한 사람' })
  @Field()
  changedBy: string;
}
