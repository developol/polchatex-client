import {Message} from './message';

export class Chat {
  public id: number;
  public chatName: String;
  public usernames: String[];
  public lastMessage: Message
}
