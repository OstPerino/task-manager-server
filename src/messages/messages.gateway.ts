import {WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer} from '@nestjs/websockets';
import {OnModuleInit} from "@nestjs/common";
import {Server} from "socket.io"
import {MessagesService} from "./messages.service";

@WebSocketGateway({cors: "*"})
export class MessagesGateway implements OnModuleInit {

  constructor(private readonly messagesService: MessagesService) {
  }

  @WebSocketServer()
  server: Server

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(`Socket id connection ${socket.id}`);
      console.log('Connected');
    })
  }

  @SubscribeMessage('newMessage')
  async onNewMessage(@MessageBody() body: any) {

    const result = await this.messagesService.createMessage(body);

    this.server.emit('onMessage', {
      msg: 'New message',
      content: result
    })
  }
}