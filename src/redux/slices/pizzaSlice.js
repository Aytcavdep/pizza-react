import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params, thunkAPI) => {
    const { search, categoryId, currentPage, sortType } = params;
    const { data } = await axios.get(
      `https://63082d44722029d9ddc94328.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ``
      }&sortBy=${sortType.sortProperty}&order=${sortType.sort}${search}`
    );
    return data;
  }
);

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: {
    items: [],
    status: 'loading',
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state, action) => {
      state.items = [];
      state.status = 'loading';
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const selectPizzaData = (state) => state.pizza;
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
