import { Injectable, Logger } from '@nestjs/common';
import { OrderDTO } from './dtos/order.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ProcessOrderPayloadDTO } from './dtos/process-order-payload.dto';
import { OrderElementDTO } from './dtos/order-element.dto';

@Injectable()
export class BillBridgeService {
  private readonly logger = new Logger(BillBridgeService.name);
  constructor(private readonly httpService: HttpService) {}

  create(payload: OrderDTO) {}

  async processOrder(payload: ProcessOrderPayloadDTO): Promise<OrderDTO> {
    const { frequency, pageSize, pageNumber } = payload;
    const { data } = await firstValueFrom(
      this.httpService
        .get<OrderDTO>('/api/service-a', {
          params: {
            limit: pageSize || 1,
            page: pageNumber || 10,
          },
        })
        .pipe(
          catchError((error) => {
            this.logger.error(error.response.data);
            throw 'Could not fetch your order based on your search parameters!';
          }),
        ),
    );
    const filteredOrders = data.orders.filter(
      (element: OrderElementDTO) => element.billingFrequency === frequency,
    );

    return { orders: filteredOrders };
  }
}
