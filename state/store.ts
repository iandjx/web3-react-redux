import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import walletReducer from "./wallets/reducer";
import userReducer from "./user/reducer";
import connectionReducer from "./connection/reducer";
// import applicationReducer from "./application/reducer";
export const store = configureStore({
  reducer: {
    wallets: walletReducer,
    user: userReducer,
    connection: connectionReducer,
    // application: applicationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
