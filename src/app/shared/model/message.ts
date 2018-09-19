export class Message {
  id: number;
  chatID: number;
  senderID: number
  content: string;
  createDateTime: string;
  isRead: boolean;

  constructor(id: number, chatID: number, senderID: number, content: string, createDateTime: string, isRead: boolean) {
    this.id = id;
    this.chatID = chatID;
    this.senderID = senderID;
    this.content = content;
    this.createDateTime = createDateTime;
    this.isRead = isRead;
  }
}
