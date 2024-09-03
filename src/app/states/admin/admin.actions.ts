import { createAction, props } from "@ngrx/store";
import { User } from "../../Model/UserCredentials";

//Admin interface
export const loadUsers = createAction('[Admin Component] Load Users',props<{token: string}>());
export const loadUsersSuccess = createAction('[Admin Component] Load Users Success', props<{users: User[]}>());
export const loadUsersFailure = createAction('[Admin Component] Load Users Failure', props<{errorMessage: string}>());