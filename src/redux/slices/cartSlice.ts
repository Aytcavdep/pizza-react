import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  type: string;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: <CartSliceState>{
    totalPrice: 0,
    items: []
  },
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        });
      }
      state.totalPrice = state.items.reduce(
        (sum, obj) => (sum += obj.price * obj.count),
        0
      );
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = state.items.reduce(
        (sum, obj) => (sum += obj.price * obj.count),
        0
      );
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce(
        (sum, obj) => (sum += obj.price * obj.count),
        0
      );
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    }
  }
});

export const selectCart = (state: RootState) => state.cart;
export const selectItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);
export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;
