import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from "@angular/router";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {Store} from "@ngrx/store";
import { userSignUp } from "../../store/User/user.actions";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  passwordRegex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*()-_+=])[a-zA-Z0-9!@#$%^&*()-_+=]{6,}$/;



  constructor(private fb: FormBuilder, private store: Store) {
  }

  onSubmit() {

    if (this.form.valid) {
      if (this.passwordRegex.test(this.form.getRawValue().password)) {
        this.store.dispatch(userSignUp.userSignup(this.form.getRawValue()));
      }

      else {
        alert("Password must be 6 characters long, have 1 special character, 1 uppercase letter and 1 number")
      }
    }
  }

}
