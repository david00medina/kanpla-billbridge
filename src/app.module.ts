import { Module } from '@nestjs/common';
import { BillBridgeModule } from './bill-bridge/bill-bridge.module';
import { BillSchedulerModule } from './bill-scheduler/bill-scheduler.module';

@Module({
  imports: [BillBridgeModule, BillSchedulerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
