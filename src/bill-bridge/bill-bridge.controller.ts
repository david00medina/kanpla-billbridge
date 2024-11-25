import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProcessOrderPayloadDTO } from './dtos/process-order-payload.dto';
import { OrderDTO } from './dtos/order.dto';
import { BillBridgeService } from './bill-bridge.service';
import { BillingDTO } from './dtos/billing.dto';

@Controller('bill-bridge')
export class BillBridgeController {
  constructor(private readonly billBridgeService: BillBridgeService) {}

  @Post()
  async createBillings(@Body() payload: OrderDTO): Promise<BillingDTO> {
    return await this.billBridgeService.create(payload);
  }

  @Get()
  async getBillings(
    @Query() payload: ProcessOrderPayloadDTO,
  ): Promise<OrderDTO> {
    return await this.billBridgeService.processOrder(payload);
  }
}
