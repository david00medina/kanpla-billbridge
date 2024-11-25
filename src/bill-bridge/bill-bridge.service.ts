import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { OrderDTO } from './dtos/order.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ProcessOrderPayloadDTO } from './dtos/process-order-payload.dto';
import { OrderElementDTO } from './dtos/order-element.dto';
import { BillingDTO } from './dtos/billing.dto';

/**
 * Service responsible for handling billing operations, including creating bills and processing orders.
 * Interacts with external services to manage billing data.
 */
@Injectable()
export class BillBridgeService {
  private readonly logger = new Logger(BillBridgeService.name);

  constructor(private readonly httpService: HttpService) {}

  /**
   * Creates a billing entry for the given order data.
   *
   * @param {OrderDTO} payload - The order details for which billing needs to be created.
   * @returns {Promise<BillingDTO>} - The billing details that were created.
   *
   * @throws {HttpException} - Throws an error if the billing creation fails.
   *
   * @example
   * const order = {
   *   orders: [
   *     {
   *       id: 1,
   *       item: 'Still water',
   *       customer: 'John Doe'
   *     }
   *   ]
   * };
   * const billing = await billBridgeService.createBill(order);
   */
  async createBill(payload: OrderDTO): Promise<BillingDTO> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<BillingDTO>('/api/service-b', payload),
      );
      return response.data;
    } catch (error) {
      this.logger.error(
        'Error creating billing:',
        error.response?.data || error.message,
      );
      throw new HttpException(
        'Billing could not be created',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Processes orders based on the provided frequency and pagination details.
   * Retrieves orders from the external service and filters them based on billing frequency.
   *
   * @param {ProcessOrderPayloadDTO} payload - The order processing parameters, including frequency and pagination details.
   * @returns {Promise<OrderDTO>} - The filtered orders matching the given frequency.
   *
   * @throws {HttpException} - Throws an error if the order processing fails.
   *
   * @example
   * const payload = {
   *   frequency: 'daily',
   *   pageNumber: 1,
   *   pageSize: 10,
   * };
   * const orders = await billBridgeService.processOrder(payload);
   */
  async processOrder(payload: ProcessOrderPayloadDTO): Promise<OrderDTO> {
    const { frequency, pageSize, pageNumber } = payload;

    try {
      const { data } = await firstValueFrom(
        this.httpService.get<OrderDTO>('/api/service-a', {
          params: {
            limit: pageSize || 1,
            page: pageNumber || 10,
          },
        }),
      );

      const filteredOrders = data.orders.filter(
        (element: OrderElementDTO) => element.billingFrequency === frequency,
      );

      return { orders: filteredOrders };
    } catch (error) {
      this.logger.error(
        'Error processing billing:',
        error.response?.data || error.message,
      );
      throw new HttpException(
        `Billing ${frequency} information could not be fetched!`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
