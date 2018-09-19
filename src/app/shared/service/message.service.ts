import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {WebSocketService} from "./web-socket.service";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private webSocketService: WebSocketService) {
    this.initializeSentMessageStreamFromWebSocketService();
  }

  receivedMessageSubject: Subject<any> = new Subject<any>();
  sentMessageSubject: Subject<any> = new Subject<any>();

  initializeSentMessageStreamFromWebSocketService(): void {
    let observable = this.webSocketService.getReceivedMessageAsObservable();
    let observer = {
      next: (message) => this.addReceivedMessageToSubject(message)
    };
    observable.subscribe(observer);
  }

  getReceivedMessageAsObservable(): Observable<any>{
    return this.receivedMessageSubject.asObservable();
  }

  addReceivedMessageToSubject(message): void {
    this.receivedMessageSubject.next(message);
  }

  getSentMessageAsObservable(): Observable<any> {
    return this.sentMessageSubject.asObservable();
  }

  addSentMessageToSubject(message): void {
    this.sentMessageSubject.next(message);
  }

  sendMessage(message, chatId: number) {
    this.webSocketService.sendMessage(message, chatId);
    this.addSentMessageToSubject(message);
  }
}
