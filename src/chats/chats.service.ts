import {Injectable} from '@nestjs/common';
import {CreateChatDto} from "./dto/create-chat.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Chat} from "./chats.model";
import {MessagesService} from "../messages/messages.service";
import {UsersService} from "../users/users.service";

@Injectable()
export class ChatsService {

  constructor(@InjectModel(Chat) private chatRepository: typeof Chat,
              private messagesService: MessagesService,
              private usersService: UsersService) {
  }

  async createChat(createChatDto: CreateChatDto) {
    return this.chatRepository.create(createChatDto);
  }

  async deleteChat(id: number) {
    return this.chatRepository.destroy({where: {id}})
  }

  async getAllMessagesFromChat(id: number) {
    // return this.chatRepository.findOne({where: {id}, include: {all: true}})
    return this.messagesService.getAllMessagesByChatId(id);
  }

  async getAllChatsForUser(token: string) {
    const decoded = await this.usersService.decode(token);
    // const chats = await this.chatRepository.findAll({where:{firstUserId: decoded.id}, include:{all:true}});
    const first = await this.chatRepository.findAll({where: {firstUserId: decoded.id}, include: {all: true}});
    const second = await this.chatRepository.findAll({where: {secondUserId: decoded.id}, include: {all: true}});
    return [...new Set([...first, ...second])];
    // return chats;
  }

  async getCurrentChat(id: number) {
    return this.chatRepository.findOne({where: {id}, include: {all: true}});
  }

}
