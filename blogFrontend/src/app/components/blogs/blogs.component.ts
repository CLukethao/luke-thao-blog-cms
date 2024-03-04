import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterOutlet} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {AddBlogComponent} from "./add-blog/add-blog.component";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {BlogInterface} from "../../interfaces/blog.interface";
import {getBlogs} from "../../store/Blog/blog.selectors";
import {loadBlogs} from "../../store/Blog/blog.actions";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {getUserId} from "../../store/User/user.selectors";

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatCardModule, MatGridListModule, MatButtonModule, MatSelectModule, MatInputModule],
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit, OnDestroy{

  blogListSub!: Subscription;
  blogList!: BlogInterface[];
  sortBy: string = "old";
  userId: number | null = null;

  constructor(private matDialog: MatDialog, private store: Store, private router: Router) {
  }

  ngOnInit() {
    this.store.dispatch(loadBlogs.loadBlogs());

    this.store.select(getUserId).subscribe(data => {
      this.userId = data
    })

    this.blogListSub = this.store.select(getBlogs).subscribe(data => {
      console.log(data)
      this.blogList = [...data]
    })
  }

  ngOnDestroy() {
    this.blogListSub.unsubscribe()
  }

  OnAddBlog() {
    this.matDialog.open(AddBlogComponent,{
      width: '40%'
    })
  }

  OnClick(id: number) {
    this.router.navigate([`/blogs/${id}`])
  }

  OnSort() {
    if (this.sortBy === "new") {
      this.blogList.sort(function(a,b) {

        return new Date(b.date).valueOf() - new Date(a.date).valueOf();
      })
    }

    if (this.sortBy === "old") {
      this.blogList.sort(function(a,b) {

        return new Date(a.date).valueOf() - new Date(b.date).valueOf();
      })
    }
  }

}
