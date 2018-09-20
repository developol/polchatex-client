import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from "../../../environments/environment";
import {Chat} from '../model/chat';
import {Observable, Subject} from 'rxjs';
import {Message} from "../model/message";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  activeChatSubject: Subject<Chat> = new Subject();
  chatListLoadedSubject: Subject<boolean> = new Subject();
  chatList: Chat[];
  activeChat: Chat;

  constructor(private http: HttpClient) {
    this.activeChatSubject.asObservable().subscribe(
      activeChat => this.activeChat = activeChat);
    this.loadChatList();
  }

  getChatHistory(chatId: number): Observable<Message[]> {
    let params = new HttpParams().set("chatID", "" + chatId);
    return this.http.get<Message[]>(environment.url + environment.chatHistoryEndpoint,
      {params: params, withCredentials: true});
  }

  getChatListLoaded(): Observable<boolean> {
    return this.chatListLoadedSubject.asObservable();
  }

  loadChatList() {
    this.http.get<Chat[]>(environment.url + "/rest/getchatlist", {withCredentials: true})
      .subscribe(chatlist => {
        this.chatList = chatlist;
        this.chatListLoadedSubject.next(true);
      });
  }

  addNewChat(user: string) {
    console.log(user);
    this.http.post<string[]>(environment.url + "/rest/addchat",[user], {withCredentials: true})
      .subscribe(
        () => this.loadChatList(),
        () => alert("nie ma takiego usera, no pszypau")
      );
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
      this.prepareMessageTime(chat);
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
      if (firstDate - secondDate > 0) {
        return -1;
      } else if (firstDate == secondDate) {
        return 0;
      } else if (secondDate - firstDate > 0) {
        return 1;
      }
    })
  }


  prepareMessageTime(chat: Chat) {
    if (chat.lastMessage) {
      if (!chat.lastMessage.createDateTime) {
      }
      chat.lastMessage.createDateTime = chat.lastMessage.createDateTime.slice(0, 10)
        + " "
        + chat.lastMessage.createDateTime.slice(11, 19)
    }
  }

  prepareChatName(chat: Chat) {
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

}
