import { Injectable, Logger } from '@nestjs/common';
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
    Logger.log('sendConfirmAccountEmail', 'CourierService');
    const eventId = this.configService.get('confirmAccountNotificationId', '');

    try {
      await this.courier.send(
        {
          eventId,
          recipientId: `${userId}`,
          brand: this.configService.get('courierBrandId', ''),
          data: {
            firstName,
            token,
            email,
          },
          profile: {
            email,
          },
        },
        {
          idempotencyKey: nanoid(),
        }
      );
      Logger.log(`Confirm account email sent to ${email}`, 'CourierService');
    } catch (error) {
      Logger.error('Failed to send confirm account email', 'CourierService');
      throw error;
    }
  }
}
