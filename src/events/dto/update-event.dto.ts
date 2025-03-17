// dto/update-event-page.input.ts
import { IsString, IsOptional } from 'class-validator';

export class UpdateEventPageInput {
  @IsString()
  eventId: number;

  @IsOptional()
  @IsString()
  pageJson: string;
}
