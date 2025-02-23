import { Resolver, Query } from '@nestjs/graphql';
import { CardResponse } from './models/card.model';
import { CardsService } from './cards.service';

@Resolver(of => CardResponse)
export class CardsResolver {
  constructor(private readonly cardsService: CardsService) {}

  @Query(returns => CardResponse, { name: 'getCards' })
  async getCards(): Promise<CardResponse> {
    return this.cardsService.getCards();
  }
}
