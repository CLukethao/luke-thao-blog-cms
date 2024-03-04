import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {ConversationInterface} from "../../../interfaces/conversation.interface";
import {Subscription} from "rxjs";
import {getConversationById, getUser} from "../../../store/User/user.selectors";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {sendMessage} from "../../../store/User/user.actions";

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, MatCardModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit{

  conversationId!: number;
  conversationSub!: Subscription;
  conversation!: ConversationInterface;
  username!: string

  message!: string;
  id!: number;


  constructor(private store: Store, private route:ActivatedRoute,) {
  }


  ngOnInit() {
    this.conversationId = Number(this.route.snapshot.paramMap.get("id"));

    this.store.select(getUser).subscribe(data => {
      this.username = data.username!;
      this.id = data.id!;
    })

    this.conversationSub = this.store.select(getConversationById(this.conversationId)).subscribe(data => {
      this.conversation = data
    })



  }

  OnSubmit() {
    this.store.dispatch(sendMessage.sendMessage({message: this.message, recipientId: 0, conversationId: this.conversationId, senderId: this.id}))
  }


}
