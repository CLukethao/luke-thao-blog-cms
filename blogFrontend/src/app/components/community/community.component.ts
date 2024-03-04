import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {Store} from "@ngrx/store";
import {UserInterface} from "../../interfaces/user.interface";
import {fetchCommunity} from "../../store/User/user.actions";
import {getCommunity} from "../../store/User/user.selectors";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {AddBlogComponent} from "../blogs/add-blog/add-blog.component";
import {SendMessageComponent} from "./send-message/send-message.component";

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit{

  userList!: UserInterface[]
  userId: number | null = null;

  constructor(private store: Store, private matDialog: MatDialog) {

  }

  ngOnInit() {
    this.store.dispatch(fetchCommunity.fetchCommunity());
    this.store.select(getCommunity).subscribe(data => {
      this.userList = data.community;
      this.userId = data.userId!;
    })
  }

  OnSendMessage(recipientId: number, recipientName: string) {
    this.matDialog.open(SendMessageComponent,{
      width: '35%',
      data: {senderId: this.userId, recipientId:recipientId, recipientUsername: recipientName}
    })

  }
}
