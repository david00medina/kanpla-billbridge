import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BillingElementDTO } from './billing-element.dto';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Represents a collection of billing entries.
 */
export class BillingDTO {
  /**
   * An array of individual billing elements.
   *
   * Each billing element represents a single billing entry with relevant details.
   *
   * @type {BillingElementDTO[]}
   */
  @ApiProperty({
    description: 'Billings',
    example: {
      billings: [
        {
          id: 0,
          item: 'Still water',
          customer: 'John REQUENA',
          submittedId: '1cd3408a-15ab-4ac6-8757-cad1ce8036f2',
          submittedAt: '2024-11-26T10:59:52.575Z',
        },
      ],
    },
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BillingElementDTO)
  billings: BillingElementDTO[];
}
