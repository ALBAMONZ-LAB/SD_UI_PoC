import { IsInt, Min, IsOptional, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(1, { message: 'pageIndex must be greater than or equal to 1' })
  pageIndex: number;

  @Type(() => Number)
  @IsInt()
  @Min(1, { message: 'pageRow must be greater than or equal to 1' })
  pageRow: number;

  @IsOptional()
  @IsIn(['ASC', 'DESC'], { message: 'order must be either ASC or DESC' })
  order?: 'ASC' | 'DESC';
}
