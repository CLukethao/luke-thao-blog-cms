import {userReducer} from "../User/user.reducer";
import {blogReducer} from "../Blog/blog.reducer";
export const AppState = {
  user: userReducer,
  blog: blogReducer
}
