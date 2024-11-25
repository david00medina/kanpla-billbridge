import { IsArray, ValidateNested } from 'class-validator';
import { OrderElementDTO } from './order-element.dto';
import { Type } from 'class-transformer';

/**
 * Represents a collection of order elements.
 */
export class OrderDTO {
  /**
   * An array of individual order elements.
   *
   * Each order element contains details about a specific order.
   *
   * @type {OrderElementDTO[]}
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderElementDTO)
  orders: OrderElementDTO[];
}
