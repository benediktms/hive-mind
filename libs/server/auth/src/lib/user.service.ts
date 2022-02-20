import { DataService } from '@hive-mind/server-data';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly dataService: DataService) {}

  public async getUserById(id: number): Promise<User> {
    const user = await this.dataService.user.findUnique({
      where: { id },
    });

    if (!user) throw new Error('User not found');

    return user;
  }

  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.dataService.user.findUnique({
      where: { email },
    });

    if (!user) throw new Error('User not found');

    return user;
  }
}
