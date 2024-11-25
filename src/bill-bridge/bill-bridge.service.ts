import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { OrderDTO } from './dtos/order.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ProcessOrderPayloadDTO } from './dtos/process-order-payload.dto';
import { OrderElementDTO } from './dtos/order-element.dto';
import { BillingDTO } from './dtos/billing.dto';

@Injectable()
export class BillBridgeService {
  private readonly logger = new Logger(BillBridgeService.name);
  constructor(private readonly httpService: HttpService) {}

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
