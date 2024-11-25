import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BillBridgeService } from './bill-bridge.service';
import { BillBridgeController } from './bill-bridge.controller';

/**
 * Module that handles billing operations, including creating and retrieving billing data.
 *
 * Imports the HttpModule with a pre-configured base URL for interacting with external services.
 */
@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://ie24.challenge.dev.kanpla.io',
      timeout: 5000,
    }),
  ],
  controllers: [BillBridgeController],
  providers: [BillBridgeService],
  exports: [BillBridgeService],
})
export class BillBridgeModule {}
