export class ChatMessage {
  constructor(author, body, timeStamp, isSelf = false) {
    this.author = author;
    this.body = body;
    this.timeStamp = timeStamp;
    this.isSelf = isSelf;
  }
}