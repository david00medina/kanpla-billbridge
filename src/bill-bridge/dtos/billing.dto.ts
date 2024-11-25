import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BillingElementDTO } from './billing-element.dto';

export class BillingDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BillingElementDTO)
  billings: BillingElementDTO[];
}
