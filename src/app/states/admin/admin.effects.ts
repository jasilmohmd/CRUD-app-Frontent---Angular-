import { inject, Injectable } from "@angular/core";
import { AdminAuthService } from "../../services/admin-auth.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AdminActions from "./admin.actions";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";


@Injectable()
export class AdminEffects {


  private api = inject(AdminAuthService);
  actions$ = inject(Actions);

  loadUsers$ = createEffect(()=> {
    return this.actions$.pipe(
      ofType(AdminActions.loadUsers),
      mergeMap((props)=> {
        return this.api.getUsers(props.token).pipe(
          map((res:any)=> AdminActions.loadUsersSuccess({users: res.users })),
          catchError((error:{ message: string })=> { 
            return of(
              AdminActions.loadUsersFailure({errorMessage: "Failed to load Products"})
            )
          })
        )
      })
    )
})

}