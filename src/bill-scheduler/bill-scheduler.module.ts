import { Module } from '@nestjs/common';
import { BillSchedulerService } from './bill-scheduler.service';
import { ScheduleModule } from '@nestjs/schedule';
import { BillBridgeModule } from '../bill-bridge/bill-bridge.module';

@Module({
  imports: [ScheduleModule.forRoot(), BillBridgeModule],
  controllers: [],
  providers: [BillSchedulerService],
})
export class BillSchedulerModule {}
