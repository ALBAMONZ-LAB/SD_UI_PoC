import { Field, ObjectType } from '@nestjs/graphql';
import { CommonResponse } from '../../common/dto/response.dto';
import { EventPage } from '../events.entity';

@ObjectType()
export class EventPageResponse extends CommonResponse {
  @Field(() => EventPage, { nullable: true })
  data?: EventPage;
}
