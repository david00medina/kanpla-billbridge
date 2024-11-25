import { IsInt, IsOptional, IsString } from 'class-validator';

/**
 * Represents a single order element containing details about an order.
 */
export class OrderElementDTO {
  /**
   * The unique identifier of the order.
   *
   * @type {number}
   * @example 101
   */
  @IsInt()
  id: number;

  /**
   * The name of the item being ordered.
   *
   * @type {string}
   * @example "Bottled Water"
   */
  @IsString()
  item: string;

  /**
   * The name of the customer placing the order.
   *
   * @type {string}
   * @example "Jane Doe"
   */
  @IsString()
  customer: string;

  /**
   * The billing frequency for the order, which may be optional.
   *
   * @type {string}
   * @example "monthly"
   * @optional
   */
  @IsString()
  @IsOptional()
  billingFrequency: string;
}
