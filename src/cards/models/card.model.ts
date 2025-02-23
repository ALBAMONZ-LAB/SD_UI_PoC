import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Card {
  @Field(type => Int)
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

  @Field(type => Int)
  totalCount: number;

  @Field(type => Int)
  row: number;

  @Field(type => Int)
  column: number;

  @Field(type => [Card])
  collection: Card[];
}
