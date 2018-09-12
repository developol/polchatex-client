import { Component, OnInit } from '@angular/core';
import {mockupMessages} from "../mockup";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages = mockupMessages;

  constructor() { }

  ngOnInit() {

  }

}
