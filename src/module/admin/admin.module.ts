import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LoginController } from './login/login.controller';
import { MainController } from './main/main.controller';
import { ManagerController } from './manager/manager.controller';
import { RoleController } from './role/role.controller';

import { ToolsService } from '../../services/tools/tools.service';
import { AdminService } from '../../services/admin/admin.service';
import { RoleService } from '../../services/role/role.service';
import { AccessService } from '../../services/access/access.service';
import { RoleAccessService } from '../../services/role-access/role-access.service';

import { AdminSchema } from '../../schema/admin.schema';
import { RoleSchema } from '../../schema/role.schema';
import { AccessSchema } from '../../schema/access.schema';
import { RoleAccessSchema } from '../../schema/role_access';

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
    ]),
  ],
  controllers: [
    LoginController,
    MainController,
    ManagerController,
    RoleController,
  ],
  providers: [
    ToolsService,
    AdminService,
    RoleService,
    AccessService,
    RoleAccessService,
  ],
  exports: [AdminService, RoleService, AccessService, RoleAccessService],
})
export class AdminModule {}
