import { PrismaService } from '@hive-mind/server-prisma';
import { Injectable } from '@nestjs/common';
import { MembershipType, User } from '@prisma/client';
import { CreateCollectiveInput } from './dto/create-collective.dto';

@Injectable()
export class CollectiveService {
  constructor(private readonly prisma: PrismaService) {}

  public async createCollective(creator: User, input: CreateCollectiveInput) {
    const collective = await this.prisma.collective.create({
      data: {
        name: input.collectiveName,
        features: input.features,
      },
    });

    await this.prisma.membership.create({
      data: {
        userId: creator.id,
        collectiveId: collective.id,
        type: MembershipType.ADMIN,
      },
    });

    return collective;
  }
}
