
import {isDevMode, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import {NavigationComponent} from "./components/navigation/navigation.component";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {AppState} from "./store/App/app.state";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UserEffects} from "./store/User/user.effects";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { MatDialogModule} from "@angular/material/dialog";
import {BlogEffects} from "./store/Blog/blog.effects";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NavigationComponent,
    StoreModule.forRoot(AppState, {}),
    EffectsModule.forRoot([UserEffects, BlogEffects]),
    StoreDevtoolsModule.instrument({ maxAge: false,
      logOnly: !isDevMode(),
      autoPause: true, }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
