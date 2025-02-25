import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Card {
  @Field(() => Int)
  franchiseCode: number;

  @Field()
  franchiseName: string;

  @Field()
  franchiseLogo: string;

  @Field()
  keywordCode: string;

  @Field({ nullable: true })
  keywordName?: string;

  @Field()
  partCode: string;

  @Field({ nullable: true })
  partName?: string;
}

@ObjectType()
export class CardResponse {
  @Field()
  resultCode: string;

  @Field()
  resultMessage: string;

  @Field(() => Int)
  totalCount: number;

  @Field(() => Int)
  row: number;

  @Field(() => Int)
  column: number;

  @Field(() => [Card])
  collection: Card[];
}
