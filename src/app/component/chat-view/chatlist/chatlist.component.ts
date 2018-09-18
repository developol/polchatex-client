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
    this.chatService.getChatList().subscribe( result =>this.chatList = result);
    this.prepareChatNames();
  }

  test() {
    console.log("dupa");
  }

  prepareChatNames(): void {
    let placeholderName: string = "";
    for(let chat of this.chatList) {
      if (chat.chatName === null) {
          for (let usr of chat.usernames) {
            placeholderName.concat(usr);
          }
          chat.chatName = placeholderName;
      }
    }
  }

}
