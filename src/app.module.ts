import { Module } from '@nestjs/common';
import { BillBridgeModule } from './bill-bridge/bill-bridge.module';

@Module({
  imports: [BillBridgeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
