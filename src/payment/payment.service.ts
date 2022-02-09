import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { InjectRazorpay } from 'nestjs-razorpay';
import * as Razorpay from 'razorpay';
import { PrismaService } from 'src/common/services/prisma.service';
import crypto from 'crypto';
@Injectable()
export class PaymentService {
  public constructor(
    private readonly prismaService: PrismaService,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    @InjectRazorpay() private readonly razorpayClient: Razorpay,
  ) {}
  async create() {
    try {
      const options = {
        amount: 50000, // amount in the smallest currency unit
        currency: 'INR',
        receipt: 'order_rcptid_11',
      };
      const response = await this.razorpayClient.orders.create(options);

      return {
        data: response,
        success: true,
      };
    } catch (e) {
      Logger.error(e.message);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return {
          error: 'Uh oh! This category already exists!',
          success: false,
        };
      }
      return { error: e.message, success: false };
    }
  }
  async verification(req: any) {
    const secret = 'K3yb0ardC4t';

    const shasum = crypto.createHmac('sha256', secret);
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
