import { Component, OnInit } from '@angular/core';
import {mockupDateSent, mockupUsers} from "../../../mockup";
import {ChatService} from '../../../shared/service/chat.service';

@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.css']
})
export class ChatlistComponent implements OnInit {
  dateSent = mockupDateSent;
  users = mockupUsers;
  constructor(chatService: ChatService) { }

  ngOnInit() {
  }

  test() {
    console.log("dupa");
  }

}
