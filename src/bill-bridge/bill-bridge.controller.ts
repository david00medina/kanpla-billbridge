import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProcessOrderPayloadDTO } from './dtos/process-order-payload.dto';
import { OrderDTO } from './dtos/order.dto';
import { BillBridgeService } from './bill-bridge.service';
import { BillingDTO } from './dtos/billing.dto';
import { ApiResponse } from '@nestjs/swagger';

/**
 * Controller that handles endpoints for billing operations.
 */
@Controller('bill-bridge')
export class BillBridgeController {
  constructor(private readonly billBridgeService: BillBridgeService) {}

  /**
   * Creates billing entries based on the provided order data.
   *
   * @param {OrderDTO} payload - The order data to create billing entries.
   * @returns {Promise<BillingDTO>} - The created billing details.
   *
   * @example
   * POST /bill-bridge
   * Body:
   * {
   *   "orders": [
   *     {
   *       "id": 1,
   *       "item": "Still water",
   *       "customer": "John Doe"
   *     }
   *   ]
   * }
   */
  @Post()
  @ApiResponse({
    status: 200,
    description: 'New billings',
    type: BillingDTO,
  })
  async createBillings(@Body() payload: OrderDTO): Promise<BillingDTO> {
    return await this.billBridgeService.createBill(payload);
  }

  /**
   * Retrieves billing data based on specified frequency and pagination details.
   *
   * @param {ProcessOrderPayloadDTO} payload - Contains frequency and pagination details for retrieving orders.
   * @returns {Promise<OrderDTO>} - The orders that match the provided criteria.
   *
   * @example
   * GET /bill-bridge?frequency=daily&pageNumber=1&pageSize=10
   */
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Found orders by frequency',
    type: OrderDTO,
  })
  async getBillings(
    @Query() payload: ProcessOrderPayloadDTO,
  ): Promise<OrderDTO> {
    return await this.billBridgeService.processOrder(payload);
  }
}
