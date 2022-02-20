import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CourierService } from './courier.service';

@Module({
  imports: [ConfigService],
  providers: [CourierService],
  exports: [CourierService],
})
export class CourierModule {}
