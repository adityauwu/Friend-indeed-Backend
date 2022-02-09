import { Controller, Post, Req } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post()
  create() {
    return this.paymentService.create();
  }
  @Post('/verification')
  verification(@Req() req: any) {
    return this.paymentService.verification(req);
  }
}
