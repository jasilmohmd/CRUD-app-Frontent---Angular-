import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AdminState } from "./admin.reducer";

export const selectUsersFeature = createFeatureSelector<AdminState>('admin');

export const selectAllUsers = createSelector(
  selectUsersFeature,
  (state: AdminState) => state.users
)

export const selectUsersError = createSelector(
  selectUsersFeature,
  (state: AdminState) => state.error
)