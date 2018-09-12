import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection(){
    var wsUrl = "http://localhost:8080";
    var socket = new SockJS(wsUrl + '/socket');
    var stompClient = Stomp.over(socket);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      var sessionId;
      var url = stompClient.ws._transport.url;
      sessionId = url.replace(
        "ws://localhost:8080/socket/",  "");
      sessionId = sessionId.replace("/websocket", "");
      sessionId = sessionId.replace(/^[0-9]+\//, "");

      console.log('Connected: ' + frame);
      console.log("Your current session is: " + url);

      var message = {
        'content' : "hello",
        'isRead' : false,
      };

      stompClient.subscribe('/user/queue/specific-user' + '-user' + sessionId, function (msgOut) {});
      stompClient.send("/app/send-message", {}, JSON.stringify(message));
    });




  }
}
