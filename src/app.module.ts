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
import { SubscriptionModule } from './subscription/subscription.module';
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 50,
    }),
    TherapistModule,
    FeedbackModule,
    CategoryModule,
    BookingModule,
    PatientModule,
    SubscriptionModule,
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
