import { Module } from '@nestjs/common';
import { LoginController } from './login/login.controller';
import { MainController } from './main/main.controller';
import { ManagerController } from './manager/manager.controller';
import { ToolsService } from 'src/services/tools/tools.service';

@Module({
  controllers: [LoginController, MainController, ManagerController],
  providers: [ToolsService]
})
export class AdminModule {}
