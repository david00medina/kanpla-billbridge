import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

/**
 * Represents a single billing element containing details about an individual billing item.
 */
export class BillingElementDTO {
  /**
   * The unique identifier of the billing element.
   *
   * @type {number}
   * @example 1
   */
  @IsInt()
  id: number;

  /**
   * The name of the item being billed.
   *
   * @type {string}
   * @example "Monthly Subscription"
   */
  @IsString()
  item: string;

  /**
   * The name of the customer for whom the billing is created.
   *
   * @type {string}
   * @example "John Doe"
   */
  @IsString()
  customer: string;

  /**
   * An optional submitted identifier for tracking purposes.
   *
   * @type {string}
   * @example "SUB123456"
   * @optional
   */
  @IsString()
  @IsOptional()
  submittedId: string;

  /**
   * The date and time when the billing was submitted.
   *
   * @type {string}
   * @example "2024-11-25T12:00:00Z"
   * @optional
   */
  @IsDate()
  @IsOptional()
  submittedAt: string;
}
