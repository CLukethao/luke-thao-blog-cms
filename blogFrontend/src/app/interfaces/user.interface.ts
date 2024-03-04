import {ConversationInterface} from "./conversation.interface";

export interface UserInterface {
  username: string | null,
  id: number | null,
  conversations: ConversationInterface[]
  community: UserInterface[]
}
