import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './module/admin/admin.module';
import { ApiModule } from './module/api/api.module';
import { DefaultModule } from './module/default/default.module';

import { MongooseModule } from '@nestjs/mongoose';

import { InitMiddleware } from './middlewares/init.middleware';
import { AdminauthMiddleware } from './middlewares/adminauth.middleware';
import { Config } from './config';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AdminModule,
    ApiModule,
    DefaultModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(InitMiddleware).forRoutes('*');
    consumer.apply(AdminauthMiddleware).forRoutes(`${Config.adminPath}/*`);
  }
}
