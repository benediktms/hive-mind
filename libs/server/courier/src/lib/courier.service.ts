import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CourierClient } from '@trycourier/courier';
import { nanoid } from 'nanoid';

@Injectable()
export class CourierService {
  constructor(private readonly configService: ConfigService) {}
  private courier = CourierClient();

  public async sendConfirmAccountEmail(
    userId: number,
    firstName: string,
    email: string,
    token: string
  ) {
    const eventId = this.configService.get('confirmAccountNotificationId', '');

    await this.courier.send(
      {
        eventId,
        recipientId: `${userId}`,
        brand: this.configService.get('courierBrandId', ''),
        data: {
          firstName,
          token,
        },
        profile: {
          email,
        },
      },
      {
        idempotencyKey: nanoid(),
      }
    );
  }
}
