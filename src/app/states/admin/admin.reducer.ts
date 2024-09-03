import { createReducer, on, State } from "@ngrx/store";
import { User } from "../../Model/UserCredentials";
import * as AdminActions from "./admin.actions";


export interface AdminState {
  users: User[];
  error: string | null;
}

export const initialAdminState: AdminState = {
  users: [],
  error: null
};

export const AdminReducer = createReducer(
  initialAdminState,
  on(AdminActions.loadUsersSuccess,(state,{users})=> ({
    ...state,
    users,
    error: null
  })),
  on(AdminActions.loadUsersFailure, (state, {errorMessage})=> ({
    ...state,
    error: errorMessage
  }))
)