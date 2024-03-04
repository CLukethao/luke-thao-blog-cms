import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {getUsername} from "../../../store/User/user.selectors";
import {NewBlogInterface} from "../../../interfaces/newBlog.interface";
import {createBlog} from "../../../store/Blog/blog.actions";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [CommonModule, MatCardModule, FormsModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatDialogModule, MatOptionModule, MatSelectModule],
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit, OnDestroy{

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    backgroundColor: ['#ffffff', Validators.required],
    fontColor: ['#000000', Validators.required],
    fontSize: ['16', Validators.required]
  });

  fontStyle: string = 'sans-serif'

  userSub!: Subscription;
  user!: string;

  constructor(private fb: FormBuilder, private store: Store) {

  }

  ngOnInit() {

    this.userSub = this.store.select(getUsername).subscribe(data => {
      this.user = data!
    })

  }

  ngOnDestroy() {

  }


  OnSubmit()  {
    if (this.form.valid) {
      const newForm: NewBlogInterface = {
        ...this.form.getRawValue(),
        fontStyle: this.fontStyle,
        author: this.user,

      }
      // console.log(this.form.getRawValue());
      this.store.dispatch(createBlog.createBlog(newForm));
    }
  }
}
