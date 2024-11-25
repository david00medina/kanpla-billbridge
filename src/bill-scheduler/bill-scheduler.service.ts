import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BillBridgeService } from '../bill-bridge/bill-bridge.service';
import { OrderDTO } from '../bill-bridge/dtos/order.dto';
import { OrderElementDTO } from '../bill-bridge/dtos/order-element.dto';

@Injectable()
export class BillSchedulerService {
  private readonly logger = new Logger(BillBridgeService.name);

  constructor(private readonly billBridgeService: BillBridgeService) {}

  @Cron('* * * * * *', {
    name: 'Every day at midnight scheduler',
  })
  async everyDayMidnight() {
    await this.executeBillRoutine('daily');
  }

  @Cron('0 0 1 * * *', {
    name: 'Every 1st day of the month at midnight scheduler',
  })
  async everyMonthMidnight() {
    await this.executeBillRoutine('monthly');
  }

  @Cron('0 0 * * * MON', {
    name: 'Every Monday at midnight scheduler',
  })
  async EveryMondayMidnight() {
    await this.executeBillRoutine('weekly');
  }

  @Cron('0 0 1 1 *', {
    name: 'Every first day of the year scheduler',
  })
  async EveryYearMidnight() {
    await this.executeBillRoutine('daily');
    await this.executeBillRoutine('weekly');
    await this.executeBillRoutine('monthly');
  }

  private async executeBillRoutine(frequency: string) {
    try {
      const orders: OrderElementDTO[] = [];
      let pageNumber: number = 1;
      const pageSize: number = 3;
      let isEnd: boolean = false;
      this.logger.debug(`Starting pagination with page ${pageNumber}`);

      while (!isEnd) {
        // Extract the orders by frequency
        const pagedOrderList: OrderDTO =
          await this.billBridgeService.processOrder({
            frequency: frequency,
            pageNumber: pageNumber,
            pageSize: pageSize,
          });

        // Add orders with matching billing frequency to the list
        orders.push(...pagedOrderList.orders);

        // Is it the end of the list?
        if (pagedOrderList.orders.length === 0) {
          isEnd = true;
        } else {
          pageNumber++;
        }
      }

      this.logger.debug(`Ending page ${pageNumber}`);

      // Generate the bills based in the order frequency
      const res = await this.billBridgeService.createBill({ orders });
      this.logger.debug(res);
    } catch (error) {
      this.logger.error('Error in daily billing scheduler', error);
    }
  }
}
