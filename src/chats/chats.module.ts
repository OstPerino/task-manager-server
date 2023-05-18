import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Chat} from "./chats.model";
import {MessagesModule} from "../messages/messages.module";
import {Message} from "../messages/messages.model";


@Module({
  controllers: [ChatsController],
  providers: [ChatsService],
  imports: [SequelizeModule.forFeature([Chat, Message]), MessagesModule]
})
export class ChatsModule {}
