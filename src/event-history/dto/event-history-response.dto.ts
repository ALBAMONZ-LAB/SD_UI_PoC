export class EventPageSummaryDto {
  eventId: number;
  eventTitle: string;
  changedAt: Date;
}

export class EventHistoryResponseDto {
  id: number;
  eventPage: EventPageSummaryDto;
  previousPageJson: object;
  changedPageJson: object;
  changeReason: string;
  changedBy: string;
  changedAt: Date;
}
