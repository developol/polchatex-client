import { Component, OnInit } from '@angular/core';
import {WebSocketService} from "../shared/service/web-socket.service";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  message: string;

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit() {}

  onSendButtonClicked() {
    this.webSocketService.sendMessage(this.message);
  }

}
