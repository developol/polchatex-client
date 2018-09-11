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
    var wsUrl = 'http://localhost:8080';
    var socket = new SockJS(wsUrl + '/secured/room');
    var stompClient = Stomp.over(socket);
    var sessionId = "";

    let url;
    stompClient.connect({}, function (frame) {
      url = stompClient.ws._transport.url;
      url = url.replace(
        "ws://localhost:8080/secured/room/",  "");
      url = url.replace("/websocket", "");
      url = url.replace(/^[0-9]+\//, "");
      console.log("Your current session is: " + url);
      sessionId = url;
    });

    setTimeout(() => {
      stompClient.subscribe(wsUrl + '/secured/user/queue/specific-user'
        + '-user' + sessionId, function (msgOut) {
        //handle messages
      alert(msgOut);
    })}, 1000);

    var message = {
      content: "eloooooooooooo"
    };
    setTimeout(() => {
      stompClient.send("http://localhost:8080/app/send/message", header, message);
    }, 1000);

    var header = {
      sessionId: sessionId
    };

  }
}
