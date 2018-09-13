import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {environment} from "../../../environments/environment";
import {Observable, Subject} from "rxjs";
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})


export class WebSocketService {
  constructor(private authenticationService: AuthenticationService) {
    this.tokenCookieObservable = this.authenticationService.getTokenCookieObservable();
    this.confirmAuthentication();
  }

  private tokenCookieObservable: Observable<boolean>;

  stompClient: any;
  receivedMessageSubject: Subject<any> = new Subject<any>();
  confirmAuthentication(): void {
    this.tokenCookieObservable.subscribe({
      next: cookie => {
      if (cookie) {
        this.initializeWebSocketConnection();
      }
        }
    });
  }

  initializeWebSocketConnection(): void {
    let socket = new SockJS(environment.url + environment.webSocketEndpoint);
    this.stompClient = Stomp.over(socket);
    let that = this;
    this.stompClient.connect({}, function (frame) {
      let url = that.stompClient.ws._transport.url;
      let sessionId = WebSocketService.getSessionId(url);

      console.log('Connected: ' + frame);
      console.log("Your current session is: " + sessionId);

      that.stompClient.subscribe(environment.subscriptionEndpoint + '-user' + sessionId,
          message => that.onMessageReceived(message));
      that.sendMessage("hello");
    });
  }

  sendMessage(content: string): void {
    this.stompClient.send(environment.sendMessageEndpoint, {},
      JSON.stringify(WebSocketService.buildMessageObject(content)));
  }

  onMessageReceived(message): void {
    if (JSON.parse(message.body).content != 'hello') {
      this.receivedMessageSubject.next(message);
    }
  }

  getReceivedMessageAsObservable(): Observable<any> {
    return this.receivedMessageSubject.asObservable();
  }

  static getSessionId(url: string): string {
    let sessionId = url.replace(environment.wsUrl + environment.webSocketEndpoint + '/',  "");
    sessionId = sessionId.replace("/websocket", "");
    sessionId = sessionId.replace(/^[0-9]+\//, "");
    return sessionId;
  }

  static buildMessageObject(content: string) : any {
    return {
      'content' : content,
      'isRead' : false,
    };
  }
}
