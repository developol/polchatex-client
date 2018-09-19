import { Component, OnInit } from '@angular/core';
import {mockupDateSent, mockupUsers} from "../../../mockup";
import {ChatService} from '../../../shared/service/chat.service';
import {MessageService} from "../../../shared/service/message.service";
import {Chat} from '../../../shared/model/chat';
import {AuthenticationService} from '../../../shared/service/authentication.service';

@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.css']
})
export class ChatlistComponent implements OnInit {
  chatList: Chat[];
  constructor(private chatService: ChatService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.chatService.getChatList().subscribe( result => {
      this.chatList = result
      this.prepareChatNames();
      this.prepareMessageTime();
    });
  }

  test() {
    console.log("dupa");
  }

  prepareChatNames(): void {
    let placeholderName: string = "";
    for(let chat of this.chatList) {
      console.log
      if (chat.chatName === null) {
          for (let usr of chat.usernames) {
            if (usr != "dupa") {
              placeholderName = placeholderName + usr + ", ";
            }
          }
          chat.chatName = placeholderName.slice(0, placeholderName.length-2)
      }
    }
  }

  prepareMessageTime(): void {
    for (let chat of this.chatList) {
      if (chat.lastMessage != null) {
        chat.lastMessage.createDateTime = chat.lastMessage.createDateTime.slice(0, 10)
          + " "
          + chat.lastMessage.createDateTime.slice(11, chat.lastMessage.createDateTime.length)
      }
    }
  }

}
