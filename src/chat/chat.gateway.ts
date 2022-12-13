import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayConnection,
    WebSocketServer,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Socket, Server } from 'socket.io';
  import { JwtService } from '@nestjs/jwt';
  import { Logger } from '@nestjs/common';

  






  import { Observable } from 'rxjs';
import { ConversationService } from './conversation.service';
import { IoAdapter } from '@nestjs/platform-socket.io';
 
  
  // @WebSocketGateway(1080, { namespace: 'chats' })
  // export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  //   @WebSocketServer()
  //   server;
  
  //   connectedUsers: string[] = [];
  
  //   constructor(
  //     private jwtService: JwtService,
  //     private conversationService: ConversationService
  //   ) {}
  
  //   async handleConnection(socket) {
  //     const user: any = await this.jwtService.verify(
  //       socket.handshake.query.token,
       
  //     );
  
  //     this.connectedUsers = [...this.connectedUsers, String(user._id)];
  
  //     // Send list of connected users
  //     this.server.emit('users', this.connectedUsers);
  //   }
  
  //   async handleDisconnect(socket) {
  //     const user: any = await this.jwtService.verify(
  //       socket.handshake.query.token,
     
  //     );
  //     const userPos = this.connectedUsers.indexOf(String(user._id));
  
  //     if (userPos > -1) {
  //       this.connectedUsers = [
  //         ...this.connectedUsers.slice(0, userPos),
  //         ...this.connectedUsers.slice(userPos + 1)
  //       ];
  //     }
  
  //     // Sends the new list of connected users
  //     this.server.emit('users', this.connectedUsers);
  //   }
  
  //   @SubscribeMessage('message')
  //   async onMessage(client, data: any) {
  //     const event: string = 'message';
  //     const result = data[0];
  
  //     await this.conversationService.saveConversation(result.message);
  //     client.broadcast.to(result.message.recieverId).emit(event, result.message);
      
  //     return Observable.create(observer =>
  //       observer.next({ event, data: result.message })
  //     );
  //   }
  
 

  // }
  
  
  
  
  
  
  
  
  
  
  
  
  
  @WebSocketGateway({ namespace: 'chat' })
  export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    logger = new Logger('ChatGateway');
    onlineUsers = new Set();
    user: any;
  
    @WebSocketServer()
    wss: Server;
  
    constructor(private jwtService: JwtService) {}
    handleConnection(socket: Socket, ...args: any[]) {
      //console.log("Get User called");

      const user = this.getUser(socket);
      
      console.log(user);
      if (!user) {
        socket.disconnect();
        this.logger.error('authentication failed ' + socket.id);
      } else {
        this.logger.warn('authentication success! ' + user.name);
        this.onlineUsers.add(user.id);
        this.dispatchUsersOnline();
      }
    }
  
    handleDisconnect(socket: Socket) {
      const user: any = this.getUser(socket);
      this.onlineUsers.delete(user.userId);
      this.logger.warn('user disconnected ' + user.username);
      this.dispatchUsersOnline();
    }
  
    @SubscribeMessage('message')
    handleMessage(client: any, payload: any): string {
      this.logger.log(payload);
      return payload;
    }
  
    private dispatchUsersOnline() {
      this.logger.log(Array.from(this.onlineUsers));
      this.wss.emit('users/online', Array.from(this.onlineUsers));
    }
  
    private getUser(socket: Socket) {
      //console.log(socket.handshake)
      //console.log(socket.handshake.query.token)
      const token = socket.handshake.query.token as string;
      console.log(token);
      const user: any = this.jwtService.decode(token);
      //console.log(user);
      return user;
    }
  }
  