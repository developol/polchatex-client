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
    this.authenticatedObservable = this.authenticationService.getAuthenticatedObservable();
    this.confirmAuthentication();
  }

  private authenticatedObservable: Observable<boolean>;
  webSocketinitialized: boolean = false;

  stompClient: any;
  receivedMessageSubject: Subject<any> = new Subject<any>();

  confirmAuthentication(): void {
    if (this.authenticationService.authenticated) {
      this.initializeWebSocketConnection();
    } else {
      this.authenticatedObservable.subscribe({
        next: authenticated => {
          if (authenticated) {
            this.initializeWebSocketConnection();
          }
        }
      });
    }
  }

  initializeWebSocketConnection(): void {
    if (this.webSocketinitialized) {
      return;
    }
    let socket = new SockJS(environment.url + environment.webSocketEndpoint);
    this.stompClient = Stomp.over(socket);
    let that = this;
    that.stompClient.connect({}, function (frame) {
      let url = that.stompClient.ws._transport.url;
      let sessionId = WebSocketService.getSessionId(url);

      console.log('Connected: ' + frame);
      console.log("Your current session is: " + sessionId);
      that.stompClient.subscribe(environment.subscriptionEndpoint + '-user' + sessionId,
          message => that.onMessageReceived(message));
    });
  }

  sendMessage(content: string, chatId: number): void {
    this.stompClient.send(environment.sendMessageEndpoint, {},
      JSON.stringify(WebSocketService.buildMessageObject(content, chatId)));
  }

  onMessageReceived(message): void {
    this.receivedMessageSubject.next(message);
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

  static buildMessageObject(content: string, chatId: number) : any {
    return {
      'messageContent' : content,
      'chatID' : chatId,
    };
  }
}
