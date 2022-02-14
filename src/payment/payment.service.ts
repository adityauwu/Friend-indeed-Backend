import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { InjectRazorpay } from 'nestjs-razorpay';
import * as Razorpay from 'razorpay';
import { createHmac } from 'crypto';

import { PrismaService } from 'src/common/services/prisma.service';
import { PaymentDto } from './payment.dto';
@Injectable()
export class PaymentService {
  public constructor(
    private readonly prismaService: PrismaService,
    //@ts-ignore
    @InjectRazorpay() private readonly razorpayClient: Razorpay,
  ) {}
  async create(input: PaymentDto) {
    try {
      const razorpayOrder = await this.razorpayClient.orders.create({
        amount: (input.amount * 100).toString(),
        currency: 'INR',
        receipt: `${input.patientId}_${new Date().getTime()}`,
      });
      const data = await this.prismaService.booking.create({
        data: {
          therapistId: input.therapistId,
          patientId: input.patientId,
          orderId: razorpayOrder?.id,
          fees: input.amount
        }
      })

      return { data, success: true };
    } catch (e) {
      Logger.error(e);
      return { error: e.message, success: false };
    }
  }

  async verification(req: any) {
    const secret = 'K3yb0ardC4t';

    const shasum = createHmac('sha256', secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    console.log(digest, req.headers['x-razorpay-signature']);

    if (digest === req.headers['x-razorpay-signature']) {
      console.log('request is legit');
      // process it
      Logger.log(req.body);
    } else {
      // pass it
    }
    return { status: 'ok' };
  }
}
