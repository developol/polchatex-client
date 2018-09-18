export class Message {
  id: number;
  chatID: number;
  sender: string;
  content: String;
  createDateTime: String;
  isRead: boolean;

  constructor(id: number, chatID: number, sender: string, content: String, createDateTime: String, isRead: boolean) {
    this.id = id;
    this.chatID = chatID;
    this.sender = sender;
    this.content = content;
    this.createDateTime = createDateTime;
    this.isRead = isRead;
  }
}
