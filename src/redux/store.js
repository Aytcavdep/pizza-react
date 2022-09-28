import { configureStore } from '@reduxjs/toolkit';

import filterSlice from './slices/filterSlice';
import cartSlice from './slices/cartSlice';
import pizza from './slices/pizzaSlice';

export default configureStore({
  reducer: {
    filter: filterSlice,
    cart: cartSlice,
    pizza,
  },
});
