import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({
    description: 'Billing ID',
    example: 0,
  })
  @IsInt()
  id: number;

  /**
   * The name of the item being billed.
   *
   * @type {string}
   * @example "Monthly Subscription"
   */
  @ApiProperty({
    description: 'Item',
    example: 'Still water',
  })
  @IsString()
  item: string;

  /**
   * The name of the customer for whom the billing is created.
   *
   * @type {string}
   * @example "John Doe"
   */
  @ApiProperty({
    description: 'Customer',
    example: 'John REQUENA',
  })
  @IsString()
  customer: string;

  /**
   * An optional submitted identifier for tracking purposes.
   *
   * @type {string}
   * @example "SUB123456"
   * @optional
   */
  @ApiProperty({
    description: 'Submitted ID',
    example: '1cd3408a-15ab-4ac6-8757-cad1ce8036f2',
  })
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
  @ApiProperty({
    description: 'Submitted at',
    example: '2024-11-26T10:59:52.575Z',
  })
  @IsDate()
  @IsOptional()
  submittedAt: string;
}
