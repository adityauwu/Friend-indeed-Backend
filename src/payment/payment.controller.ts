import { Body, Controller, Post, Req } from '@nestjs/common';
import { PaymentDto } from './payment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post()
  create(@Body() input: PaymentDto) {
    return this.paymentService.create(input);
  }
  @Post('/verification')
  verification(@Req() req: any, @Body() input:any) {
    //console.log(input);
    //console.log("the input is -----^")
    return this.paymentService.verification(req, input);
  }
}
