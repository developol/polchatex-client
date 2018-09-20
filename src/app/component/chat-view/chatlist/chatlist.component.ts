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
      this.chatService.prepareChatName(chat);
    }
  }

  prepareMessageTimes(): void {
    for (let chat of this.chatList) {
      this.chatService.prepareMessageTime(chat);
    }
  }


}
