import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, exhaustMap, map, of} from "rxjs";
import {createConversation, fetchCommunity, fetchUser, sendMessage, userAuth, userSignUp} from "./user.actions";
import {UserInterface} from "../../interfaces/user.interface";
import {Router} from "@angular/router";
import {HttpService} from "../../services/http.service";
import {ConversationInterface} from "../../interfaces/conversation.interface";
import {MatDialog} from "@angular/material/dialog";

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private service: HttpService, private router: Router, private matDialog: MatDialog) {
  }

  userAuth = createEffect(() =>
    this.actions$.pipe(
      ofType(userAuth.userAuth),
      exhaustMap((props) => {
        return this.service.userAuth(props).pipe(
          map((data: UserInterface) => {
            console.log(data)
            void this.router.navigate(["/blogs"])
            return userAuth.userAuthSuccess(data)
          }),

          catchError((error) => of(userAuth.userAuthFail({error: error})))
        )
      })
    )
  );

  userSignup = createEffect(() =>
    this.actions$.pipe(
      ofType(userSignUp.userSignup),
      exhaustMap((props) => {
        return this.service.userSignUp(props).pipe(
          map((data: UserInterface) => {
            void this.router.navigate(["/blogs"])
            return userSignUp.userSignupSuccess(data)
          }),
          catchError((error) => of(userSignUp.userSignupFail({error: error})))
        )
      })
    )
  );

  fetchCommunity = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchCommunity.fetchCommunity),
      exhaustMap((props) => {
        return this.service.fetchCommunity().pipe(
          map((data: UserInterface[]) => {
            return fetchCommunity.fetchCommunitySuccess({community: data})
          }),
          catchError((error) => of(fetchCommunity.fetchCommunityFail({error: error})))
        )
      })
    )
  );

  fetchUser = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUser.fetchUser),
      exhaustMap((props) => {
        return this.service.fetchUser(props).pipe(
          map((data: UserInterface) => {
            return fetchUser.fetchUserSuccess(data)
          }),
          catchError((error) => of(fetchUser.fetchUserFail({error: error})))
        )
      })
    )
  );

  sendMessage = createEffect(() =>
    this.actions$.pipe(
      ofType(sendMessage.sendMessage),
      exhaustMap((props) => {
        return this.service.sendMessage(props).pipe(
          map((data: ConversationInterface[]) => {
            return sendMessage.sendMessageSuccess({conversations: data})
          }),
          catchError((error) => of(sendMessage.sendMessageFail({error: error})))
        )
      })
    )
  );

  createConversation = createEffect(() =>
    this.actions$.pipe(
      ofType(createConversation.createConversation),
      exhaustMap((props) => {
        return this.service.createConversation(props).pipe(
          map((data: ConversationInterface[]) => {
            this.matDialog.closeAll();
            return createConversation.createConversationSuccess({conversations: data})
          }),
          catchError((error) => of(createConversation.createConversationFail({error: error})))
        )
      })
    )
  );




}
