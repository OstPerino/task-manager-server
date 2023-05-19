import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Chat} from "../chats/chats.model";
import {Message} from "./messages.model";
import {MessagesGateway} from "./messages.gateway";

@Module({
  providers: [MessagesGateway, MessagesService],
  exports: [MessagesService],
  imports: [
    SequelizeModule.forFeature([Chat, Message]),
  ]
})
export class MessagesModule {}
