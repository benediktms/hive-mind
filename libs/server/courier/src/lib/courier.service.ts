import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CourierClient } from '@trycourier/courier';
import { nanoid } from 'nanoid';

@Injectable()
export class CourierService {
  constructor(private readonly configService: ConfigService) {}

  private courier = CourierClient({
    authorizationToken: this.configService.get('COURIER_AUTH_TOKEN', 'token'),
  });

  public async sendConfirmAccountEmail(
    userId: number,
    firstName: string,
    email: string,
    token: string
  ) {
    Logger.log('sendConfirmAccountEmail', 'CourierService');
    const eventId = this.configService.get(
      'CONFIRM_ACCOUNT_NOTIFICATION_ID',
      ''
    );

    try {
      await this.courier.send(
        {
          eventId,
          recipientId: `${userId}`,
          brand: this.configService.get('COURIER_BRAND_ID', ''),
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

  public async sendRequestResetEmail(
    userId: number,
    email: string,
    token: string
  ) {
    Logger.log('sendRequestResetEmail', 'CourierService');
    const eventId = this.configService.get(
      'REQUEST_RESET_PASSWORD_NOTIFICATION_ID',
      ''
    );

    try {
      await this.courier.send(
        {
          eventId,
          recipientId: `${userId}`,
          brand: this.configService.get('COURIER_BRAND_ID', ''),
          data: {
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
      Logger.log(`Request reset email sent to ${email}`, 'CourierService');
    } catch (error) {
      Logger.error('Failed to send request reset email', 'CourierService');
      throw error;
    }
  }
}
