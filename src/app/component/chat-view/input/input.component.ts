import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from "../../../shared/service/message.service";
import {ChatService} from "../../../shared/service/chat.service";
import {Chat} from "../../../shared/model/chat";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, OnDestroy {
  message: string;
  keyPressListener: EventListener;
  activeChat: Chat;

  constructor(private messageService: MessageService,
              private chatService: ChatService) { }

  ngOnInit() {
    this.initializeKeyboardShortcuts();
    window.addEventListener("keypress", this.keyPressListener);

    this.chatService.getActiveChatAsObservable().subscribe(
      chat => this.activeChat = chat);
  }

  initializeKeyboardShortcuts(): void {
    this.keyPressListener = (event) => {
      if ((<KeyboardEvent>event).keyCode == 13) {
        this.onEnterPressed();
      }
    };
  }

  onSendButtonClicked() {
    this.onSendMessage();
  }

  onEnterPressed() {
    this.onSendMessage();
  }

  onSendMessage() {
    this.messageService.sendMessage(this.message, this.activeChat.id);
    this.message = '';
  }

  ngOnDestroy() {
    window.removeEventListener("keypress", this.keyPressListener);
  }

}
