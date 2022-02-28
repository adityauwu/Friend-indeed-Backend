import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerBehindProxyGuard } from './common/guards/throttler-behind-proxy.guard';
import { AppController } from './app.controller';
import { TherapistModule } from './therapist/therapist.module';
import { FeedbackModule } from './feedback/feedback.module';
import { CategoryModule } from './category/category.module';
import { BookingModule } from './booking/booking.module';
import { PatientModule } from './patient/patient.module';
import { RazorpayModule } from 'nestjs-razorpay';
import { PaymentModule } from './payment/payment.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    RazorpayModule.forRoot({
      key_id: 'rzp_test_F0sBYBI61kGSeC',
      key_secret: 'HihQcOHNIr8KJzjOd4RJV8S7',
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 50,
    }),
    TherapistModule,
    AuthModule,
    FeedbackModule,
    CategoryModule,
    BookingModule,
    PatientModule,
    PaymentModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
  ],
  controllers: [AppController],
})
export class AppModule {
}





