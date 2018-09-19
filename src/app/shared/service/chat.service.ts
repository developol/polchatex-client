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

  constructor(private http: HttpClient) { }

  getChatHistory(chatId: number): Observable<Message[]> {
    let params = new HttpParams().set("chatID", "" + chatId);
    return this.http.get<Message[]>(environment.url + environment.chatHistoryEndpoint,
      {params: params, withCredentials: true});
  }

  getChatList(): Observable<Chat[]> {
    return this.http.get<Chat[]>(environment.url + "/rest/getchatlist", {withCredentials: true});
  }


  getActiveChatAsObservable(): Observable<Chat> {
    return this.activeChatSubject.asObservable();
  }

  setActiveChat(chat: Chat) {
    this.activeChatSubject.next(chat);
  }

}
