import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './module/admin/admin.module';
import { ApiModule } from './module/api/api.module';
import { DefaultModule } from './module/default/default.module';
import { ToolsService } from './services/tools/tools.service';

@Module({
  imports: [AdminModule, ApiModule, DefaultModule],
  controllers: [AppController],
  providers: [AppService, ToolsService],
})
export class AppModule {}
