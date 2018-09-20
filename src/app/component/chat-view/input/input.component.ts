import {Component, OnInit} from '@angular/core';
import {MessageService} from "../../../shared/service/message.service";
import {ChatService} from "../../../shared/service/chat.service";
import {Chat} from "../../../shared/model/chat";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  message: string;
  activeChat: Chat;

  constructor(private messageService: MessageService,
              private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getActiveChatAsObservable().subscribe(
      chat => this.activeChat = chat);
  }

  onSendButtonClicked() {
    this.onSendMessage();
  }

  onEnterPressed(event: KeyboardEvent) {
    if (event.keyCode == 13) {
      this.onSendMessage();
    }
  }

  onSendMessage() {
    this.messageService.sendMessage(this.message, this.activeChat.id);
    this.message = '';
  }
}
