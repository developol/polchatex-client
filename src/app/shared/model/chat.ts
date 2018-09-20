import {Message} from './message';

export class Chat {
  id: number;
  chatName: string;
  usernames: string[];
  lastMessage: Message;

  constructor(id: number, chatName: string, usernames: string[], lastMessage: Message) {
    this.id = id;
    this.chatName = chatName;
    this.usernames = usernames;
    this.lastMessage = lastMessage;
  }
}
