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
import { ChatModule } from './chat/chat.module';
import { NewsletterService } from './newsletter/newsletter.service';
import { NewsletterController } from './newsletter/newsletter.controller';
import { FriendService } from './friend/friend.service';
import { FriendController } from './friend/friend.controller';
import { FriendModule } from './friend/friend.module';

import { NewsletterModule } from './newsletter/newsletter.module';
import { MailModule } from './mail/mail.module';
import { MoodModule } from './mood/mood.module';
import { ChatsubscriptionModule } from './chatsubscription/chatsubscription.module';

@Module({
  imports: [
    RazorpayModule.forRoot({
      key_id: 'rzp_test_cevPczkfMipFQF',
      key_secret: 'PFnusY4i9McIATFnRTKu87yG',
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
    ChatModule,
    NewsletterModule,
    MailModule,
    FriendModule,
    MoodModule,
    ChatsubscriptionModule
   
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
    NewsletterService,
  ],
  controllers: [AppController, NewsletterController],
})
export class AppModule {
}





