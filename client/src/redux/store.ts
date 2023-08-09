import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/user_slice";
import chatReducer from "./slices/chat_slice";
import messageReducer from "./slices/message_slice";
import thunk from "redux-thunk";
// import logger from "redux-logger";
import logger from "redux-logger";

const reducers = combineReducers({
  userReducer,
  chatReducer,
  messageReducer,
});

export const store = configureStore({
  reducer: reducers,
  // middleware: [thunk, logger],
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(thunk);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
