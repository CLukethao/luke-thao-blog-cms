import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {Store} from "@ngrx/store";
import {BlogInterface} from "../../../interfaces/blog.interface";
import {getBlogById} from "../../../store/Blog/blog.selectors";
import {ActivatedRoute} from "@angular/router";
import {getUserId} from "../../../store/User/user.selectors";
import {createComment, deleteBlog, viewBlog} from "../../../store/Blog/blog.actions";
import {FormsModule} from "@angular/forms";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {EditBlogComponent} from "../edit-blog/edit-blog.component";

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatGridListModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnDestroy, OnInit {

  blogSub!: Subscription;
  blog!: BlogInterface;
  blogId!:number;
  userId: number | null = null;
  comment: string = '';

  constructor(private store: Store, private route:ActivatedRoute, private matDialog: MatDialog) {
  }

  ngOnInit() {

    this.blogId = Number(this.route.snapshot.paramMap.get("id"))

    this.blogSub = this.store.select(getBlogById(this.blogId)).subscribe(data => {
      console.log(data)
      this.blog = data
    })

    this.store.select(getUserId).subscribe(data => {
      if (data) {
        this.userId = data;
        const viewed = this.blog.views.map(user => user.id);
        if (!viewed.includes(data)) {
          console.log('not viewed');
          this.store.dispatch(viewBlog.viewBlog({userId: data!, blogId: this.blog.id}));
        }
      }
    })

  }

  ngOnDestroy() {
    this.blogSub.unsubscribe();
  }

  OnSubmit() {
    if (this.comment && this.userId) {
      this.store.dispatch(createComment.createComment({userId: this.userId, blogId: this.blogId, comment: this.comment}));
    }
  }

  OnEdit() {
    this.matDialog.open(EditBlogComponent,{
      width: '40%',
      data: {blog: this.blog}
    })
  }

  OnDelete() {
    this.store.dispatch(deleteBlog.deleteBlog({blogId: this.blogId}))
  }
}
