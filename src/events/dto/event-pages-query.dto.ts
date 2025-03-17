import { IsInt, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsInt()
  @Min(1, { message: 'pageIndex must be greater than or equal to 1' })
  pageIndex: number;

  @IsInt()
  @Min(1, { message: 'pageRow must be greater than or equal to 1' })
  pageRow: number;
}
