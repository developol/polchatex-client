import {Message} from './message';

export class Chat {
  id: number;
  chatName: String;
  usernames: String[];
  lastMessage: Message

  constructor(id: number, chatName: String, usernames: String[], lastMessage: Message) {
    this.id = id;
    this.chatName = chatName;
    this.usernames = usernames;
    this.lastMessage = lastMessage;
  }
}
