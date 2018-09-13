import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from "../shared/service/message.service";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, OnDestroy {
  message: string;
  keyPressListener: EventListener;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.initializeKeyboardShortcuts();
    window.addEventListener("keypress", this.keyPressListener);
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
    this.messageService.sendMessage(this.message);
    this.message = '';
  }

  ngOnDestroy() {
    window.removeEventListener("keypress", this.keyPressListener);
  }

}
