import {WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer} from '@nestjs/websockets';
import {OnModuleInit} from "@nestjs/common";
import {Server} from "socket.io"

@WebSocketGateway({cors: "*"})
export class ChatsGateway implements OnModuleInit {

  @WebSocketServer()
  server: Server

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(`Socket id connection ${socket.id}`);
      console.log('Connected');
    })
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onMessage', {
      msg: 'New message',
      content: body
    })
  }
}


// @SubscribeMessage('message')
// getMessage(@MessageBody() message: any) {
//   console.log(message);
// }
//
// @SubscribeMessage('createChat')
// create(@MessageBody() createChatDto: CreateChatDto) {
//   return this.chatsService.create(createChatDto);
// }
//
// @SubscribeMessage('findAllChats')
// findAll() {
//   return this.chatsService.findAll();
// }
//
// @SubscribeMessage('findOneChat')
// findOne(@MessageBody() id: number) {
//   return this.chatsService.findOne(id);
// }
//
// @SubscribeMessage('updateChat')
// update(@MessageBody() updateChatDto: UpdateChatDto) {
//   return this.chatsService.update(updateChatDto.id, updateChatDto);
// }
//
// @SubscribeMessage('removeChat')
// remove(@MessageBody() id: number) {
//   return this.chatsService.remove(id);
// }
