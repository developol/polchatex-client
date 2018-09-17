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
  webSocketinitialized: boolean = false;

  stompClient: any;
  receivedMessageSubject: Subject<any> = new Subject<any>();

  confirmAuthentication(): void {
    if (this.authenticationService.checkIfCookieExists()) {
      this.initializeWebSocketConnection();
    } else {
      this.tokenCookieObservable.subscribe({
        next: cookie => {
          if (cookie) {
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
    //let socket = new SockJS(environment.url + environment.webSocketEndpoint);
    let socket = new SockJS("https://" + this.authenticationService.jwtToken + "@" + "agile-hollows-19556.herokuapp.com" + environment.webSocketEndpoint);
    this.stompClient = Stomp.over(socket);
    let that = this;
    that.stompClient.connect({"Authorization" : "JWT " + this.authenticationService.jwtToken}, function (frame) {
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
