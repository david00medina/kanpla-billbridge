import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BillBridgeService } from '../bill-bridge/bill-bridge.service';
import { OrderDTO } from '../bill-bridge/dtos/order.dto';
import { OrderElementDTO } from '../bill-bridge/dtos/order-element.dto';

/**
 * Service responsible for scheduling and executing billing routines at specified intervals.
 * Utilizes cron jobs to trigger billing processes daily, weekly, monthly, and yearly.
 */
@Injectable()
export class BillSchedulerService {
  private readonly logger = new Logger(BillBridgeService.name);

  constructor(private readonly billBridgeService: BillBridgeService) {}

  /**
   * Executes the daily billing routine every day at midnight.
   *
   * @cron-expression `* * * * * *` - Runs every second for demonstration purposes. (Should be adjusted to `0 0 * * *` for midnight)
   */
  @Cron('* * * * * *', {
    name: 'Every day at midnight scheduler',
  })
  async everyDayMidnight() {
    await this.executeBillRoutine('daily');
  }

  /**
   * Executes the monthly billing routine on the first day of every month at midnight.
   *
   * @cron-expression `0 0 1 * * *` - Runs every 1st day of the month at midnight.
   */
  @Cron('0 0 1 * * *', {
    name: 'Every 1st day of the month at midnight scheduler',
  })
  async everyMonthMidnight() {
    await this.executeBillRoutine('monthly');
  }

  /**
   * Executes the weekly billing routine every Monday at midnight.
   *
   * @cron-expression `0 0 * * * MON` - Runs every Monday at midnight.
   */
  @Cron('0 0 * * * MON', {
    name: 'Every Monday at midnight scheduler',
  })
  async EveryMondayMidnight() {
    await this.executeBillRoutine('weekly');
  }

  /**
   * Executes yearly billing routines for daily, weekly, and monthly billing schedules on the first day of the year at midnight.
   *
   * @cron-expression `0 0 1 1 *` - Runs every first day of the year at midnight.
   */
  @Cron('0 0 1 1 *', {
    name: 'Every first day of the year scheduler',
  })
  async EveryYearMidnight() {
    await this.executeBillRoutine('daily');
    await this.executeBillRoutine('weekly');
    await this.executeBillRoutine('monthly');
  }

  /**
   * Executes the billing routine for a specific frequency, retrieving and processing orders.
   *
   * @param {string} frequency - The billing frequency (`daily`, `weekly`, `monthly`).
   *
   * @throws {Error} - Logs an error if the billing routine cannot be executed successfully.
   */
  private async executeBillRoutine(frequency: string) {
    try {
      const orders: OrderElementDTO[] = [];
      let pageNumber: number = 1;
      const pageSize: number = 3;
      let isEnd: boolean = false;
      this.logger.debug(`Starting pagination with page ${pageNumber}`);

      // Paginate and retrieve orders based on the given frequency
      while (!isEnd) {
        const pagedOrderList: OrderDTO =
          await this.billBridgeService.processOrder({
            frequency: frequency,
            pageNumber: pageNumber,
            pageSize: pageSize,
          });

        // Add orders with matching billing frequency to the list
        orders.push(...pagedOrderList.orders);

        // Determine if this is the end of the pagination
        if (pagedOrderList.orders.length === 0) {
          isEnd = true;
        } else {
          pageNumber++;
        }
      }

      this.logger.debug(`Ending page ${pageNumber}`);

      // Generate the bills based on the retrieved orders
      const res = await this.billBridgeService.createBill({ orders });
      this.logger.debug(res);
    } catch (error) {
      this.logger.error('Error in daily billing scheduler', error);
    }
  }
}
