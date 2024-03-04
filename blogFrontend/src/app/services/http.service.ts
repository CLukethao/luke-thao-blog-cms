import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, switchMap, tap} from "rxjs";
import {Router} from "@angular/router";
import {UserInterface} from "../interfaces/user.interface";
import {NewBlogInterface} from "../interfaces/newBlog.interface";
import {BlogInterface, BlogListInterface} from "../interfaces/blog.interface";
import {EditBlogInterface} from "../interfaces/editBlog.interface";
import {ConversationInterface} from "../interfaces/conversation.interface";
import {SendMessageInterface} from "../interfaces/sendMessage.interface";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private router: Router) {

  }

  userAuth(credentials: {username: string, password: string}): Observable<UserInterface>   {
    return this.http.post("http://localhost:8080/user/login", credentials) as Observable<UserInterface>
  }

  userSignUp(credentials: {username: string, password: string}): Observable<UserInterface>   {
    return this.http.post("http://localhost:8080/user/create", credentials) as Observable<UserInterface>
  }

  loadBlogs(): Observable<BlogInterface[]>{

    return this.http.get("http://localhost:8080/blog") as Observable<BlogInterface[]>
  }

  createBlog(newBlog: NewBlogInterface): Observable<BlogInterface[]>{
    return this.http.post("http://localhost:8080/blog/create", newBlog) as Observable<BlogInterface[]>
  }

  viewBlog(user: {userId: number, blogId: number}): Observable<BlogInterface> {

    return this.http.post("http://localhost:8080/blog/view", user) as Observable<BlogInterface>;
  }

  createComment(comment: {userId: number, blogId: number, comment: string}): Observable<BlogInterface> {
    console.log("http service")
    return this.http.post("http://localhost:8080/blog/comment", comment) as Observable<BlogInterface>;
  }

  deleteBlog(blogId: {blogId: number}) {
    console.log("http service")
    return this.http.delete("http://localhost:8080/blog/" + blogId.blogId)
  }

  editBlog(editedBlog: EditBlogInterface): Observable<BlogInterface[]> {
    console.log('editblog service')
    return this.http.post("http://localhost:8080/blog/edit", editedBlog) as Observable<BlogInterface[]>
  }

  fetchCommunity(): Observable<UserInterface[]> {

    return this.http.get("http://localhost:8080/user/community") as Observable<UserInterface[]>

  }

  fetchUser(id: {id: number}): Observable<UserInterface> {
    return this.http.get("http://localhost:8080/user/"+id.id) as Observable<UserInterface>
  }

  sendMessage(message: SendMessageInterface): Observable<ConversationInterface[]> {
    return this.http.post("http://localhost:8080/conversation/message", message) as Observable<ConversationInterface[]>
  }

  createConversation(message: SendMessageInterface): Observable<ConversationInterface[]> {
    return this.http.post("http://localhost:8080/conversation/new", message) as Observable<ConversationInterface[]>
  }
}
