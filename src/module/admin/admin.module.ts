import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LoginController } from './login/login.controller';
import { MainController } from './main/main.controller';
import { ManagerController } from './manager/manager.controller';

import { ToolsService } from '../../services/tools/tools.service';
import { AdminService } from '../../services/admin/admin.service';
import { RoleService } from '../../services/role/role.service';

import { AdminSchema } from '../../schema/admin.schema';
import { Rolechema } from '../../schema/role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Admin',
        schema: AdminSchema,
        collection: 'admin',
      },
      {
        name: 'Role',
        schema: Rolechema,
        collection: 'role'
      }
    ]),
  ],
  controllers: [LoginController, MainController, ManagerController],
  providers: [ToolsService, AdminService, RoleService],
})
export class AdminModule {}
