import { Component, OnInit } from '@angular/core';
import {MessageService} from "../shared/service/message.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages = [];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.initializeMessageStream();
    setInterval(() => console.log(this.messages), 1000);
  }

  initializeMessageStream() {
    let receivedMessageObservable = this.messageService.getReceivedMessageAsObservable();
    let receivedMessageObserver = {
      next: (message) => {
        console.log(message);
        if (message && message.body) {
          let messageItem = {
            'content': JSON.parse(message.body).content,
            'class': 'received-message'
          };
          this.messages.push(messageItem);
        }
      }
    };
    receivedMessageObservable.subscribe(receivedMessageObserver);
    let sentMessageObservable = this.messageService.getSentMessageAsObservable();
    let sentMessageObserver = {
      next: (message) => {
        let messageItem = {
          'content': message,
          'class': 'sent-message'
        };
        this.messages.push(messageItem);
      }
    };
    sentMessageObservable.subscribe(sentMessageObserver);
  }

}
