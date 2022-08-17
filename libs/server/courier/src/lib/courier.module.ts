import { Module } from '@nestjs/common';
import { CourierService } from './courier.service';

@Module({
  providers: [CourierService],
  exports: [CourierService],
})
export class CourierModule {}
