import {ConversationInterface} from "./conversation.interface";
import {BlogInterface} from "./blog.interface";

export interface UserInterface {
  username: string | null,
  id: number | null,
  userBlogs: BlogInterface[],
  conversations: ConversationInterface[],
  community: UserInterface[],
}
