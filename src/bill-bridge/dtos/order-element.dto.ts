import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({
    description: 'Order ID',
    example: 1,
  })
  @IsInt()
  id: number;

  /**
   * The name of the item being ordered.
   *
   * @type {string}
   * @example "Bottled Water"
   */
  @ApiProperty({
    description: 'Item',
    example: 'Banana',
  })
  @IsString()
  item: string;

  /**
   * The name of the customer placing the order.
   *
   * @type {string}
   * @example "Jane Doe"
   */
  @ApiProperty({
    description: 'Customer',
    example: 'Alice Brown',
  })
  @IsString()
  customer: string;

  /**
   * The billing frequency for the order, which may be optional.
   *
   * @type {string}
   * @example "monthly"
   * @optional
   */
  @ApiProperty({
    description: 'Billing frequency',
    example: 'monthly',
  })
  @IsString()
  @IsOptional()
  billingFrequency: string;
}
