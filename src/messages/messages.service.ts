import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Message} from "./messages.model";
import {CreateMessageDto} from "./dto/create-message.dto";

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message) private messageRepository: typeof Message) {
  }

  async createMessage(createMessageDto: CreateMessageDto) {
    return this.messageRepository.create(createMessageDto);
  }

  async getAllMessagesByChatId(id: number) {
    return this.messageRepository.findAll({where:{chatId: id}});
  }
}
