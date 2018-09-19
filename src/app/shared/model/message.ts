export class Message {
  id: number;
  chatID: number;
  sender: string;
  content: string;
  createDateTime: string;
  isRead: boolean;
  type: string;

  constructor(id: number, chatID: number, sender: string, content: string, createDateTime: string, isRead: boolean) {
    this.id = id;
    this.chatID = chatID;
    this.sender = sender;
    this.content = content;
    this.createDateTime = createDateTime;
    this.isRead = isRead;
  }
}
