import { Test } from '@nestjs/testing';
import { CourierService } from './courier.service';

describe('CourierService', () => {
  let service: CourierService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CourierService],
    }).compile();

    service = module.get(CourierService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
