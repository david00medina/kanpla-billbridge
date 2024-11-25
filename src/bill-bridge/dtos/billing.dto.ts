import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BillingElementDTO } from './billing-element.dto';

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
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BillingElementDTO)
  billings: BillingElementDTO[];
}
