import {Body, Controller, Get, Headers, Param, Post} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import {CreateNotificationDto} from "./dto/create-notification.dto";

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.createNotification(createNotificationDto)
  }

  @Get(':id')
  async getUserNotifications(@Headers('authorization') token, @Param('id') id: string) {
    return this.notificationsService.getUserNotifications(token, +id);
  }
}
