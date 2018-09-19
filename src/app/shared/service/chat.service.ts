import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from "../../../environments/environment";
import {Chat} from '../model/chat';
import {Observable, Subject} from 'rxjs';
import {Message} from "../model/message";
import {ChatlistComponent} from "../../component/chat-view/chatlist/chatlist.component";
import {compareNumbers} from "@angular/compiler-cli/src/diagnostics/typescript_version";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  activeChatSubject: Subject<Chat> = new Subject();
  chatList: Chat[];
  activeChat: Chat;

  constructor(private http: HttpClient) {
    this.activeChatSubject.asObservable().subscribe(
      activeChat => this.activeChat = activeChat);
  }

  getChatHistory(chatId: number): Observable<Message[]> {
    let params = new HttpParams().set("chatID", "" + chatId);
    return this.http.get<Message[]>(environment.url + environment.chatHistoryEndpoint,
      {params: params, withCredentials: true});
  }

  getChatListLoaded(): Observable<boolean> {
    let chatListLoaded: Subject<boolean> = new Subject();
    this.http.get<Chat[]>(environment.url + "/rest/getchatlist", {withCredentials: true}).subscribe(
      chatlist => {
        this.chatList = chatlist;
        chatListLoaded.next(true);
      }, error => chatListLoaded.next(false)
    );
    return chatListLoaded.asObservable();
  }


  getActiveChatAsObservable(): Observable<Chat> {
    return this.activeChatSubject.asObservable();
  }

  setActiveChat(chat: Chat) {
    this.activeChatSubject.next(chat);
  }

  updateChatList(message: Message) {
    if (message) {
      let chat: Chat = this.chatList.filter((chat) => chat.id == message.chatID)[0];
      chat.lastMessage = message;
      ChatlistComponent.prepareMessageTime(chat);
    }
    this.chatList.sort((chat1, chat2) => {
      if (!chat1.lastMessage) {
        return 1;
      }
      if (!chat2.lastMessage) {
        return -1;
      }
      let firstDate = Date.parse(chat1.lastMessage.createDateTime);
      let secondDate = Date.parse(chat2.lastMessage.createDateTime);
      return compareNumbers([secondDate], [firstDate]);
    })
  }

}
