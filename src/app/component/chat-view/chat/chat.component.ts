import { Component, OnInit } from '@angular/core';
import {MessageService} from "../../../shared/service/message.service";
import {ChatService} from "../../../shared/service/chat.service";
import {Message} from "../../../shared/model/message";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  currentMessages: Message[];
  messages: Map<number, Message[]>;
  chatName: string;

  constructor(private messageService: MessageService,
              private chatService: ChatService) { }

  ngOnInit() {
    this.initializeLoadingMessages();
  }

  initializeLoadingMessages(): void {
    this.messages = this.messageService.messages;
    this.chatService.getActiveChatAsObservable().subscribe(
      chat => {
        this.currentMessages = [];
        if (this.messages.get(chat.id)) {
          this.currentMessages = this.messages.get(chat.id);
        } else {
          this.messageService.getChatMessagesLoadedAsObservable().subscribe(
            () => this.currentMessages = this.messages.get(chat.id))
        }
        this.chatName = chat.chatName;
      }
    )
  }
}
