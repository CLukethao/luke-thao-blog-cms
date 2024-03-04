import {UserInterface} from "./user.interface";
import {MessagesInterface} from "./messages.interface";

export interface ConversationInterface {
  id: number,
  messages: MessagesInterface[],
  date: string,
  participant1: string,
  participant2: string
}
