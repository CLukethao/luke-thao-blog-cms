import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {Router, RouterLink} from "@angular/router";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {AppStateInterface} from "../../store/App/appState.interface";
import {getUsername} from "../../store/User/user.selectors";
import {userLogout} from "../../store/User/user.actions";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatMenuModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  usernameSub!: Subscription;
  username?: string | null;

  constructor(private store: Store<AppStateInterface>, private router: Router) {

  }

  ngOnInit() {
    this.usernameSub = this.store.select(getUsername).subscribe( data => {
      this.username = data
    })
  }

  onLogout() {
    this.store.dispatch(userLogout());
    this.router.navigate(["/login"])
  }

}
