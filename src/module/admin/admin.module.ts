import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LoginController } from './login/login.controller';
import { MainController } from './main/main.controller';
import { ManagerController } from './manager/manager.controller';
import { RoleController } from './role/role.controller';
import { AccessController } from './access/access.controller';
import { FocusController } from './focus/focus.controller';

import { ToolsService } from '../../services/tools/tools.service';
import { AdminService } from '../../services/admin/admin.service';
import { RoleService } from '../../services/role/role.service';
import { AccessService } from '../../services/access/access.service';
import { RoleAccessService } from '../../services/role-access/role-access.service';
import { FocusService } from '../../services/focus/focus.service';

import { AdminSchema } from '../../schema/admin.schema';
import { RoleSchema } from '../../schema/role.schema';
import { AccessSchema } from '../../schema/access.schema';
import { RoleAccessSchema } from '../../schema/role_access.schema';
import { FocusSchema } from '../../schema/focus.schema';
import { GoodsController } from './goods/goods.controller';


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
        schema: RoleSchema,
        collection: 'role',
      },
      {
        name: 'Access',
        schema: AccessSchema,
        collection: 'access',
      },
      {
        name: 'RoleAccess',
        schema: RoleAccessSchema,
        collection: 'role_access',
      },
      {
        name: 'Focus',
        schema: FocusSchema,
        collection: 'focus',
      },
    ]),
  ],
  controllers: [
    LoginController,
    MainController,
    ManagerController,
    RoleController,
    AccessController,
    FocusController,
    GoodsController,
  ],
  providers: [
    ToolsService,
    AdminService,
    RoleService,
    AccessService,
    RoleAccessService,
    FocusService
  ],
  exports: [AdminService, RoleService, AccessService, RoleAccessService],
})
export class AdminModule {}
