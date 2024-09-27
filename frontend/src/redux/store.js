// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "./Slice/slice";

export const store = configureStore({
  reducer: {
    toggle: toggleReducer,
  },
});
