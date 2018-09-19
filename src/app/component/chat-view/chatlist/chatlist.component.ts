import { Component, OnInit } from '@angular/core';
import {mockupDateSent, mockupUsers} from "../../../mockup";
import {ChatService} from '../../../shared/service/chat.service';
import {Chat} from '../../../shared/model/chat';

@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.css']
})
export class ChatlistComponent implements OnInit {
  chatList: Chat[];
  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getChatList().subscribe( result => {
      this.chatList = result;
      this.prepareChatNames();
      this.prepareMessageTime();
    });
  }

  onChatClicked(chat: Chat) {
    this.chatService.setActiveChat(chat);
  }

  prepareChatNames(): void {
    let placeholderName: string = "";
    for(let chat of this.chatList) {
      if (chat.chatName === null) {
          for (let usr of chat.usernames) {
            if (usr != "dupa") {
              placeholderName = placeholderName + usr + ", ";
            }
          }
          chat.chatName = placeholderName.slice(0, placeholderName.length-2);
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
