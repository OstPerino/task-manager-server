import {Body, Controller, Delete, Get, Headers, Param, Post} from '@nestjs/common';
import { ChatsService } from './chats.service';
import {CreateChatDto} from "./dto/create-chat.dto";

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Delete(':id')
  async deleteChat(@Param('id') id: string) {
    return this.chatsService.deleteChat(+id);
  }

  @Post()
  async createChat(@Body() createChatDto: CreateChatDto) {
    console.log(createChatDto);
    return this.chatsService.createChat(createChatDto);
  }

  @Get(':id')
  async getAllMessagesFromChat(@Param('id') id: string) {
    return this.chatsService.getAllMessagesFromChat(+id);
  }

  @Get()
  async getAllChatsForUser(@Headers('authorization') token) {
    return this.chatsService.getAllChatsForUser(token);
  }

  @Get('current-chat/:id')
  async getCurrentChat(@Param('id') id: string) {
    return this.chatsService.getCurrentChat(+id);
  }
}
