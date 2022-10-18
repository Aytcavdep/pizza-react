import { configureStore } from "@reduxjs/toolkit";

import filterSlice from "./slices/filterSlice";
import cartSlice from "./slices/cartSlice";
import pizza from "./slices/pizzaSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart: cartSlice,
    pizza
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
