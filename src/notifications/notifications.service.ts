import {Body, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Notification} from './notifications.model'
import {CreateNotificationDto} from "./dto/create-notification.dto";
import {UsersService} from "../users/users.service";

@Injectable()
export class NotificationsService {
  constructor(@InjectModel(Notification) private notificationRepository: typeof Notification,
              private usersService: UsersService,) {
  }

  async createNotification(createNotificationDto: CreateNotificationDto) {
    const notification = this.notificationRepository.create(createNotificationDto);
    return notification;
  }

  async getUserNotifications(token: string, userId: number) {
    const decoded = await this.usersService.decode(token);
    console.log(decoded.id);
    return this.notificationRepository.findAll({where: {userReceiverId: userId}, include: {all: true}});
  }
}
