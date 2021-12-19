import { Test } from '@nestjs/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DataService],
    }).compile();

    service = module.get(DataService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
