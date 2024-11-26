import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Enum representing the available billing frequencies.
 */
export enum FrequencyEnum {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

/**
 * Represents the payload for processing an order, including frequency and pagination details.
 */
export class ProcessOrderPayloadDTO {
  /**
   * The frequency for processing orders.
   *
   * @type {FrequencyEnum}
   * @example "daily"
   */
  @IsEnum(FrequencyEnum)
  frequency: string;

  /**
   * The page number for paginated results.
   * Optional value that defaults to the first page.
   *
   * @type {number}
   * @example 1
   * @optional
   */
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  pageNumber: number;

  /**
   * The page size indicating the number of items per page.
   * Optional value that defines how many items to return in each result.
   *
   * @type {number}
   * @example 10
   * @optional
   */
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  pageSize: number;
}
