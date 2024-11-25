import { IsArray, ValidateNested } from 'class-validator';
import { OrderElementDTO } from './order-element.dto';
import { Type } from 'class-transformer';

export class OrderDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderElementDTO)
  orders: OrderElementDTO[];
}
