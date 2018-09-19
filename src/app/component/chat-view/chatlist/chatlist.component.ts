import { Component, OnInit } from '@angular/core';
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
    this.chatService.getChatListLoaded().subscribe(loaded => {
      if (loaded) {
        this.chatList = this.chatService.chatList;
        this.prepareChatNames();
        this.prepareMessageTimes();
        this.chatService.updateChatList(null);
        this.chatService.setActiveChat(this.chatList[0]);
      }
    });
  }

  onChatClicked(chat: Chat) {
    this.chatService.setActiveChat(chat);
  }

  prepareChatNames(): void {
    for(let chat of this.chatList) {
      ChatlistComponent.prepareChatName(chat);
    }
  }

  static prepareChatName(chat: Chat) {
    if (chat.chatName === null) {
      chat.chatName = "";
      let first = true;
      for (let usr of chat.usernames) {
        if (usr != sessionStorage.getItem("USERNAME")) {
          if (!first) {
            chat.chatName += ", ";
          }
          first = false;
          chat.chatName += usr;
        }
      }
    }
  }

  prepareMessageTimes(): void {
    for (let chat of this.chatList) {
      ChatlistComponent.prepareMessageTime(chat);
    }
  }

  static prepareMessageTime(chat: Chat) {
    if (chat.lastMessage) {
      if (!chat.lastMessage.createDateTime) {
      }
      chat.lastMessage.createDateTime = chat.lastMessage.createDateTime.slice(0, 10)
        + " "
        + chat.lastMessage.createDateTime.slice(11, 19)
    }
  }

}
