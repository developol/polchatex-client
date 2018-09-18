import { Component, OnInit } from '@angular/core';
import {mockupDateSent, mockupUsers} from "../../../mockup";
import {ChatService} from '../../../shared/service/chat.service';
import {MessageService} from "../../../shared/service/message.service";

@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.css']
})
export class ChatlistComponent implements OnInit {
  dateSent = mockupDateSent;
  users = mockupUsers;
  constructor(private chatService: ChatService, private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.sendMessage("dupa", 3);
    console.log("sent")
  }

  test() {
    console.log("dupa");
  }

}
