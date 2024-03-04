import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {BlogInterface} from "../../../interfaces/blog.interface";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {Store} from "@ngrx/store";
import {createConversation} from "../../../store/User/user.actions";

@Component({
  selector: 'app-send-message',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule, MatCardModule, MatDialogModule, MatIconModule],
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent {

  form = this.fb.nonNullable.group({
    message: ['', Validators.required],
  });

  constructor(private store: Store, private fb:FormBuilder, @Inject(MAT_DIALOG_DATA) public data: {senderId: number, recipientId: number, recipientUsername: string}) {
  }

  OnSubmit() {
    this.store.dispatch(createConversation.createConversation({
      senderId: this.data.senderId,
      recipientId: this.data.recipientId,
      conversationId: 0,
      message: this.form.getRawValue().message
    }))
  }

}
