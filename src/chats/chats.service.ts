import {Injectable} from '@nestjs/common';
import {CreateChatDto} from "./dto/create-chat.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Chat} from "./chats.model";
import {MessagesService} from "../messages/messages.service";

@Injectable()
export class ChatsService {

  constructor(@InjectModel(Chat) private chatRepository: typeof Chat, private messagesService: MessagesService) {
  }

  async createChat(createChatDto: CreateChatDto) {
    return this.chatRepository.create(createChatDto);
  }

  async deleteChat(id: number) {
    return this.chatRepository.destroy({where: {id}})
  }

  async getAllMessageFromChat(id: number) {

  }

}
