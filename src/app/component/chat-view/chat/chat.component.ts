import { Component, OnInit } from '@angular/core';
import {MessageService} from "../../../shared/service/message.service";
import {ChatService} from "../../../shared/service/chat.service";
import {Chat} from "../../../shared/model/chat";
import {Message} from "../../../shared/model/message";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  currentMessages: MessageItem[];
  messages: Map<number, MessageItem[]> = new Map<number, MessageItem[]>();

  activeChat: Chat;

  constructor(private messageService: MessageService,
              private chatService: ChatService) { }

  ngOnInit() {
    this.initializeChatHistory();
    this.initializeMessageStream();
  }

  initializeChatHistory() {
    this.chatService.getActiveChatAsObservable().subscribe(
      chat => {
        this.activeChat = chat;
        if (this.messages.get(chat.id)) {
          this.currentMessages = this.messages.get(chat.id);
        } else {
          this.currentMessages = [];
          this.chatService.getChatHistory(chat.id).subscribe(
            messages => {
              messages.forEach(message => {
                if (message.sender == sessionStorage.getItem("USERNAME")) {
                  this.currentMessages.push(new MessageItem(message.content, MessageType.SENT));
                } else {
                  this.currentMessages.push(new MessageItem(message.content, MessageType.RECEIVED));
                }
              });
              this.messages.set(chat.id, this.currentMessages);
            }
          )
        }
      });
  }

  initializeMessageStream() {
    setInterval(() => console.log(this.messages), 1000);
    this.messageService.getReceivedMessageAsObservable().subscribe(
      (message) => {
        if (message && message.body) {
          let msg = JSON.parse(message.body);
          let messageItem = new MessageItem(msg.content, MessageType.RECEIVED);
          if (this.messages.get(msg.chat.id)) {
            this.messages.get(msg.chat.id).push(messageItem);
            //this.activeChat.lastMessage.content = "kurwa";
            //TODO aktualizacja lastmessage w chacie (obiektowosc dziala z chatlist)
          } else {
            this.messages.set(msg.chat.id, [messageItem]);
          }
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
