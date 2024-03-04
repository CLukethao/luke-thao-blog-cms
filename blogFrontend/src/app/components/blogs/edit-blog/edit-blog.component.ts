import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {BlogInterface} from "../../../interfaces/blog.interface";
import {EditBlogInterface} from "../../../interfaces/editBlog.interface";
import {editBlog} from "../../../store/Blog/blog.actions";

@Component({
  selector: 'app-edit-blog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
  });


  constructor(private fb: FormBuilder, private store: Store, @Inject(MAT_DIALOG_DATA) public data: {blog: BlogInterface}) {

  }

  ngOnInit() {
    this.form.setValue({title: this.data.blog.title, description: this.data.blog.description})

  }


  OnSubmit()  {
    if (this.form.valid) {
      const editedBlog: EditBlogInterface = {
        ...this.form.getRawValue(),
        blogId: this.data.blog.id,
        authorId: this.data.blog.author.id
      }

      this.store.dispatch(editBlog.editBlog(editedBlog));
    }
  }
}
