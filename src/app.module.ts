import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './module/admin/admin.module';
import { ApiModule } from './module/api/api.module';
import { DefaultModule } from './module/default/default.module';

import { MongooseModule } from '@nestjs/mongoose';

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
export class AppModule {}
