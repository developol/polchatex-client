import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  getChatHistory(chatId: number): void {
    let params = new HttpParams().set("chatID", "" + chatId);
    //this.http.get(environment.url + environment.chatHistoryEndpoint, {params: params}).subscribe(
      //response => console.log(response)
    //)
  }
}
