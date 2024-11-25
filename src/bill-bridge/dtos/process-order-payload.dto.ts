import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

enum FrequencyEnum {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export class ProcessOrderPayloadDTO {
  @IsEnum(FrequencyEnum)
  frequency: string;
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  pageNumber: number;
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  pageSize: number;
}
