import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {Router, RouterOutlet} from "@angular/router";
import {Subscription} from "rxjs";
import {BlogInterface} from "../../interfaces/blog.interface";
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {getUser} from "../../store/User/user.selectors";
import {getBlogsByUser} from "../../store/Blog/blog.selectors";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatGridListModule, MatOptionModule, MatSelectModule, RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userBlogsSub!: Subscription;
  userBlogs!: (BlogInterface | undefined)[];
  sortBy: string = "old";
  userId: number | null = null;
  username: string | null = null;

  constructor(private matDialog: MatDialog, private store: Store, private router: Router) {
  }

  ngOnInit() {

    this.store.select(getUser).subscribe(data => {
      this.userId = data.id
      this.username = data.username

      this.userBlogsSub = this.store.select(getBlogsByUser(this.username!)).subscribe(data => {
        this.userBlogs = data
      })
    })


  }

  ngOnDestroy() {
    this.userBlogsSub.unsubscribe()
  }


  OnClick(id: number) {
    this.router.navigate([`/blogs/${id}`])
  }

  OnSort() {
    if (this.sortBy === "new") {
      this.userBlogs.sort(function(a,b) {

        return new Date(b!.date).valueOf() - new Date(a!.date).valueOf();
      })
    }

    if (this.sortBy === "old") {
      this.userBlogs.sort(function(a,b) {

        return new Date(a!.date).valueOf() - new Date(b!.date).valueOf();
      })
    }
  }
}
