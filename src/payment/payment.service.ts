import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { InjectRazorpay } from 'nestjs-razorpay';
import * as Razorpay from 'razorpay';
import shortid from 'shortid';
@Injectable()
export class PaymentService {
  public constructor(
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

      return {
        data: await this.razorpayClient.orders.create(options),
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
}
