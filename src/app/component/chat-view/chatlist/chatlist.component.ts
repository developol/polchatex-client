import { Component, OnInit } from '@angular/core';
import {mockupDateSent, mockupUsers} from "../../../mockup";
import {ChatService} from '../../../shared/service/chat.service';
import {MessageService} from "../../../shared/service/message.service";
import {Chat} from '../../../shared/model/chat';

@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.css']
})
export class ChatlistComponent implements OnInit {
  dateSent = mockupDateSent;
  users = mockupUsers;
  chatList: Chat[];
  constructor(private chatService: ChatService, private messageService: MessageService) { }

  ngOnInit() {
    this.chatService.getChatList().subscribe( result => this.chatList = result);
    console.log("---");
    console.log(this.chatList);
    console.log("---");
  }

  test() {
    console.log("dupa");
  }

}
