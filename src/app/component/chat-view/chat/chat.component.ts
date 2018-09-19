import { Component, OnInit } from '@angular/core';
import {MessageService} from "../../../shared/service/message.service";
import {ChatService} from "../../../shared/service/chat.service";
import {Chat} from "../../../shared/model/chat";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  currentMessages: MessageItem[];
  messages: Map<Chat, MessageItem[]> = new Map<Chat, MessageItem[]>();

  activeChat: Chat;

  constructor(private messageService: MessageService,
              private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getActiveChatAsObservable().subscribe(
      chat => {
        this.activeChat = chat;
        if (this.messages.get(chat)) {
          this.currentMessages = this.messages.get(this.activeChat);
        } else {
          this.currentMessages = [];
          this.chatService.getChatHistory(chat.id).subscribe(
            messages => messages.forEach(message => {
              // TODO sent/received
              this.currentMessages.push(new MessageItem(message.content, MessageType.RECEIVED));
            })
          )
        }
      });
    let that = this;
    setTimeout(function() {that.chatService.getChatHistory(3)}, 1000);
    this.initializeMessageStream();
  }

  initializeMessageStream() {
    this.messageService.getReceivedMessageAsObservable().subscribe(
      (message) => {
        if (message && message.body) {
          let content = JSON.parse(message.body).content;
          this.currentMessages.push(new MessageItem(content, MessageType.RECEIVED));
        }
      }
    );
    this.messageService.getSentMessageAsObservable().subscribe(
      (message) => {
        this.currentMessages.push(new MessageItem(message, MessageType.SENT));
      }
    );
  }
}

enum MessageType {
  SENT, RECEIVED
}

class MessageItem {
  content: string;
  class: string;

  constructor(content: string, type: MessageType) {
    let cssClass;
    if (type == MessageType.RECEIVED) {
      cssClass = 'received-message';
    } else if (type == MessageType.SENT) {
      cssClass = 'sent-message';
    }
    this.content = content;
    this.class = cssClass;
  }
}
