import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  constructor() {
    this.initializeWebSocketConnection();
  }

  stompClient: any;

  initializeWebSocketConnection(): void {
    let socket = new SockJS(environment.url + environment.webSocketEndpoint);
    this.stompClient = Stomp.over(socket);
    let that = this;
    this.stompClient.connect({}, function (frame) {
      var url = that.stompClient.ws._transport.url;
      var sessionId = WebSocketService.getSessionId(url);

      console.log('Connected: ' + frame);
      console.log("Your current session is: " + sessionId);

      that.stompClient.subscribe(environment.subscriptionEndpoint + '-user' + sessionId, function (msgOut) {});
      that.sendMessage("hello");
    });
  }

  sendMessage(content: string): void {
    this.stompClient.send(environment.sendMessageEndpoint, {},
      JSON.stringify(WebSocketService.buildMessageObject(content)));
  }

  static getSessionId(url: string): string {
    var sessionId = url.replace(environment.wsUrl + environment.webSocketEndpoint + '/',  "");
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
