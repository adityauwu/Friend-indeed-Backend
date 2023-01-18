import { ConsoleLogger, Injectable, Logger } from '@nestjs/common';
const { PrismaClient } = require('@prisma/client')

const Prisma = new PrismaClient()
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
    //console.log(process.env.RAZORPAY_KEY_ID + "-----> secret----->" + process.env.RAZORPAY_KEY_SECRET)
    try {
      const razorpayOrder = await this.razorpayClient.orders.create({
        amount: (input.amount * 100).toString(),
        currency: 'INR',
        receipt: `${input.patientId}`,
        //receipt: `${input.patientId}_${new Date().getTime()}`,
      });
      const data = await this.prismaService.booking.create({
        data: {
          therapistId: input.therapistId,
          patientId: input.patientId,
          orderId: razorpayOrder?.id,
          fees: input.amount,
        }
      })
      

      return { data, success: true };
    } catch (e) {
      Logger.error(e);
      return { error: e.message, success: false };
    }
  }

  async verification(req: any, input : any) {
    // console.log(req)
    // console.log('--------------------------------------')
     console.log(req.body)
    // console.log("--------------------------------------")
   // console.log(req.headers['x-razorpay-signature'])
    
   
   if(req.body.orderCreationId){
   const data = await this.prismaService.booking.update({
    where: { orderId: req.body.orderCreationId },
    data: { 
      status : 'BOOKED'
     },
  })
    console.log(data);
}


//below part is not workiong 
   



//const secret = process.env.RAZORPAY_KEY_SECRET;

   
   
   
   
   
   
   
   
   const secret = "PFnusY4i9McIATFnRTKu87yG";
   
   
   const temp = JSON.stringify(req.body.razorpayOrderId) + "|" + JSON.stringify(req.body.razorpayPaymentId)
    //const shamtemp= createHmac('sha256', temp);
   // console.log(shamtemp);


    
    const shasum = createHmac('sha256', secret);
    shasum.update(temp);
    const digest = shasum.digest('hex');
   // console.log(digest)
    console.log("checking if req is legit")
   
    if (digest === req.body.razorpaySignature) {
      console.log('request is legit');
      // process it
      Logger.log(req.body);
    } else {
      console.log("req is not legit")
      // pass it
    }
    return { status: 'ok' };
  }
}
