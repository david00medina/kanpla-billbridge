import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BillBridgeService } from './bill-bridge.service';
import { BillBridgeController } from './bill-bridge.controller';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://ie24.challenge.dev.kanpla.io',
      timeout: 5000,
    }),
  ],
  controllers: [BillBridgeController],
  providers: [BillBridgeService],
})
export class BillBridgeModule {}
