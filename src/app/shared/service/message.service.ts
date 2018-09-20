import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {WebSocketService} from "./web-socket.service";
import {Message} from "../model/message";
import {ChatService} from "./chat.service";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Map<number, Message[]> = new Map<number, Message[]>();

  constructor(private webSocketService: WebSocketService,
              private chatService: ChatService) {
    this.initializeSentMessageStreamFromWebSocketService();
    this.initializeMessageStream();
    this.initializeChatHistory();
  }

  receivedMessageSubject: Subject<Message> = new Subject<Message>();
  sentMessageSubject: Subject<Message> = new Subject<Message>();
  chatMessagesLoadedSubject: Subject<boolean> = new Subject<boolean>();


  initializeSentMessageStreamFromWebSocketService(): void {
    this.webSocketService.getReceivedMessageAsObservable().subscribe(
      (message) => this.addReceivedMessageToSubject(message));
  }

  initializeMessageStream() {
    this.receivedMessageSubject.asObservable().subscribe(
      (message) => {
        message.type = 'received-message';
        if (this.messages.get(message.chatID)) {
          this.messages.get(message.chatID).push(message);
        } else {
          this.messages.set(message.chatID, [message]);
        }
        this.chatService.updateChatList(message);
      }
    );
    this.sentMessageSubject.asObservable().subscribe(
      (message) => {
        message.type = 'sent-message';
        if (this.messages.get(message.chatID)) {
          this.messages.get(message.chatID).push(message);
        } else {
          this.messages.set(message.chatID, [message]);
        }
        this.chatService.updateChatList(message);
      }
    );
  }

  initializeChatHistory() {
    this.chatService.getActiveChatAsObservable().subscribe(
      chat => {
        if (!this.messages.get(chat.id)) {
          this.chatService.getChatHistory(chat.id).subscribe(
            messages => {
              this.messages.set(chat.id, []);
              this.chatMessagesLoadedSubject.next(true);
              messages.forEach(message => {
                if (message.sender == sessionStorage.getItem("USERNAME")) {
                  message.type = 'sent-message';
                  this.messages.get(chat.id).push(message);
                } else {
                  message.type = 'received-message';
                  this.messages.get(chat.id).push(message);
                }
              });
            }
          )
        }
      });
  }

  addReceivedMessageToSubject(message: Message): void {
    this.receivedMessageSubject.next(message);
  }

  addSentMessageToSubject(message: Message): void {
    this.sentMessageSubject.next(message);
  }

  sendMessage(message, chatId: number) {
    this.webSocketService.sendMessage(message, chatId);
    let timestamp = new Date();
    timestamp.setTime(timestamp.getTime() + 2*3600*1000);
    let msg = new Message(undefined, chatId, sessionStorage.getItem("USERNAME"), message, timestamp.toISOString(), undefined);
    this.addSentMessageToSubject(msg);
  }

  getChatMessagesLoadedAsObservable(): Observable<boolean> {
    return this.chatMessagesLoadedSubject.asObservable();
  }
}
