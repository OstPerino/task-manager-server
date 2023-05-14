import {Module} from '@nestjs/common';
import {NotificationsService} from './notifications.service';
import {NotificationsController} from './notifications.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Notification} from "./notifications.model";
import {UsersModule} from "../users/users.module";
import {JwtService} from "@nestjs/jwt";

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, JwtService],
  imports: [SequelizeModule.forFeature([Notification]), UsersModule]
})
export class NotificationsModule {
}
