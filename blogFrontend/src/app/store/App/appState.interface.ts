import {UserInterface} from "../../interfaces/user.interface";
import {BlogListInterface} from "../../interfaces/blog.interface";

export interface AppStateInterface {
  user: UserInterface,
  blog: BlogListInterface
}
