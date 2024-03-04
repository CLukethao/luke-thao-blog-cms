import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {getUsername} from "../store/User/user.selectors";
import {map} from "rxjs";
import {AppStateInterface} from "../store/App/appState.interface";

export const CanActivate = () => {

  //const authService = inject(AuthService);
  const router = inject(Router);
  const store = inject(Store<AppStateInterface>);
  const a = true;


  return store.select(getUsername).pipe(
    map((username) => {
      if (username) {
        return true
      } else {
        return router.navigate(["/login"])
      }
    })
  )

  // if (a) {
  //   return true
  // }
  //
  // else {
  //   void router.navigate(['/login']);
  //   return false
  // }

};
