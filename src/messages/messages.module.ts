import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import {SequelizeModule} from "@nestjs/sequelize";
import {Chat} from "../chats/chats.model";
import {Message} from "./messages.model";

@Module({
  providers: [MessagesGateway, MessagesService],
  exports: [MessagesService],
  imports: [
    SequelizeModule.forFeature([Chat, Message]),
  ]
})
export class MessagesModule {}
