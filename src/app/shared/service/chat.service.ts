import { Injectable } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(http: HttpClientModule) { }

  getChatList: Observable<Chat[]>
}
