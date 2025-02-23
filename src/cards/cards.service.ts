import { Injectable } from '@nestjs/common';
import { CardResponse } from './models/card.model';
import { cardCollection } from './data/cardData';

@Injectable()
export class CardsService {
  async getCards(): Promise<CardResponse> {
    return {
      resultCode: "SUCCESS",
      resultMessage: "성공",
      totalCount: cardCollection.length,
      row: 2,
      column: 4,
      collection: cardCollection,
    };
  }
}
