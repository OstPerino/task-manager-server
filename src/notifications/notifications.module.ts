import {Module} from '@nestjs/common';
import {NotificationsService} from './notifications.service';
import {NotificationsController} from './notifications.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Notification} from "./notifications.model";

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  imports: [SequelizeModule.forFeature([Notification])]
})
export class NotificationsModule {
}
