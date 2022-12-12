import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './Mailer/mailer.module';
import { UserModule } from './user/user.module';
import { EnquiryModule } from './enquiry/enquiry.module';
import { FileuploadModule } from './fileupload/fileupload.module';
import { StarRatingModule } from './star-rating/star-rating.module';
import { ActivitylogModule } from './activitylog/activitylog.module';
import { ArchitectsModule } from './architects/architects.module';
import { PaymentplansModule } from './paymentplans/paymentplans.module';
import { PostsOldModule } from './posts_old/posts_old.module';
import { ProjectRequirementsModule } from './project_requirements/project_requirements.module';
import { ProjectTypesModule } from './project_types/project_types.module';
import { ProjectSubTypesModule } from './project-sub_types/project-sub_types.module';
import { ProjectsModule } from './projects/projects.module';
import { SearchModule } from './search/search.module';
import { UserPlansModule } from './user-plans/user-plans.module';
import { UsersModule } from './users/users.module';
import { RequirementlistModule } from './requirementlist/requirementlist.module';
import { QuotationModule } from './quotation/quotation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    MailModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
    UserModule,
    EnquiryModule,
    FileuploadModule,
    StarRatingModule,
    ActivitylogModule,
    ArchitectsModule,
    PaymentplansModule,
    PostsOldModule,
    ProjectRequirementsModule,
    ProjectTypesModule,
    ProjectSubTypesModule,
    ProjectsModule,
    SearchModule,
    UserPlansModule,
    UsersModule,
    RequirementlistModule,
    QuotationModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
