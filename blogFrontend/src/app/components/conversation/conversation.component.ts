import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {Router, RouterOutlet} from "@angular/router";
import {Store} from "@ngrx/store";
import {ConversationInterface} from "../../interfaces/conversation.interface";
import {getConversations, getUserId} from "../../store/User/user.selectors";
import { fetchUser} from "../../store/User/user.actions";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterOutlet],
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  conversationsSub!: Subscription;
  conversations!: ConversationInterface[];
  username!: string;

  constructor(private store: Store, private router: Router) {
  }

  ngOnInit() {

    this.store.select(getUserId).subscribe(data => {
      this.store.dispatch(fetchUser.fetchUser({id: data!}));
    })

    this.conversationsSub = this.store.select(getConversations).subscribe(data => {
      this.conversations = data.conversations;
      this.username = data.username!;
    })

  }

  OnClick(conversationId: number) {
    this.router.navigate(["conversations/" + conversationId])

  }
}
