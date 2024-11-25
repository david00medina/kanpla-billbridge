import { Module } from '@nestjs/common';
import { BillSchedulerService } from './bill-scheduler.service';
import { ScheduleModule } from '@nestjs/schedule';
import { BillBridgeModule } from '../bill-bridge/bill-bridge.module';

/**
 * Module that handles scheduling of billing operations.
 *
 * Imports the ScheduleModule to provide cron job functionality for executing recurring tasks.
 * Also imports BillBridgeModule to access billing services for creating and processing billing records.
 */
@Module({
  imports: [ScheduleModule.forRoot(), BillBridgeModule],
  controllers: [],
  providers: [BillSchedulerService],
})
export class BillSchedulerModule {}
