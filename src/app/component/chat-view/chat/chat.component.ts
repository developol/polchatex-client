import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MessageService} from "../../../shared/service/message.service";
import {ChatService} from "../../../shared/service/chat.service";
import {Message} from "../../../shared/model/message";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
  currentMessages: Message[];
  messages: Map<number, Message[]>;
  chatName: string;
  chatID: number;
  notificationBeep: any;

  constructor(private messageService: MessageService,
              private chatService: ChatService) { }

  ngOnInit() {
    this.initializeLoadingMessages();
    this.initializeAutoScrolling();
  }

  ngAfterViewInit() {
    this.initializeNotificationSound();
  }



  initializeLoadingMessages(): void {
    this.messages = this.messageService.messages;
    this.chatService.getActiveChatAsObservable().subscribe(
      chat => {
        this.currentMessages = [];
        if (this.messages.get(chat.id)) {
          this.currentMessages = this.messages.get(chat.id);
          for (let i = 0; i < 6; i++) {
            setTimeout(() => this.scrollToBottom(), 3 * i);
          }
        } else {
          this.messageService.getChatMessagesLoadedAsObservable().subscribe(
            () => this.currentMessages = this.messages.get(chat.id));
          for (let i = 0; i < 10; i++) {
            setTimeout(() => this.scrollToBottom(), 3 * i);
          }
        }
        this.chatName = chat.chatName;
        this.chatID = chat.id;

      }
    )
  }

  scrollToBottom(): void {
    let messageBox = document.getElementById("message-box");
    messageBox.scrollTop = messageBox.scrollHeight;
  };

  initializeAutoScrolling(): void {
    for (let i = 10; i < 25; i++) {
      setTimeout(() => this.scrollToBottom(), 10 * i);
    }
    this.messageService.getNewMessageAsObservable().subscribe(
      (message) => {
        if (message.chatID == this.chatID) {
          this.scrollToBottom();
        }
      }
    )
  }

  initializeNotificationSound(): void {
    this.notificationBeep = new Audio();
    this.notificationBeep.src = "src/assets/sms-alert-1-daniel_simon.mp3";
    this.messageService.getNewMessageAsObservable().subscribe(
      (message) => {
        if (message.type == 'received-message') {
          this.notificationBeep.load();
          this.notificationBeep.play();
        }
      }
    );
  }
}
