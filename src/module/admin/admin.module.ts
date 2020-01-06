import { Module } from '@nestjs/common';
import { LoginController } from './login/login.controller';
import { MainController } from './main/main.controller';
import { ManagerController } from './manager/manager.controller';
import { ToolsService } from '../../services/tools/tools.service';
import { AdminService } from '../../services/admin/admin.service';

import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from '../../schema/admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Admin',
        schema: AdminSchema,
        collection: 'admin',
      },
    ]),
  ],
  controllers: [LoginController, MainController, ManagerController],
  providers: [ToolsService, AdminService],
})
export class AdminModule {}
