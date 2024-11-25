import { Controller, Get, Query } from '@nestjs/common';
import { ProcessOrderPayloadDTO } from './dtos/process-order-payload.dto';
import { OrderDTO } from './dtos/order.dto';
import { BillBridgeService } from './bill-bridge.service';

@Controller('bill-bridge')
export class BillBridgeController {
  constructor(private readonly billBridgeService: BillBridgeService) {}

  @Get()
  async getBillings(
    @Query() payload: ProcessOrderPayloadDTO,
  ): Promise<OrderDTO> {
    return await this.billBridgeService.processOrder(payload);
  }
}
