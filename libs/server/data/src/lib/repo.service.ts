import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class RepoService {
  constructor(
    @InjectRepository(User)
    public readonly userRepository: Repository<User>
  ) {}
}
