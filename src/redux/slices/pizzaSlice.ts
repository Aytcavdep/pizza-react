import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { Sort } from "./filterSlice";

export type sarchPizzaParams = {
  search: string;
  categoryId: number;
  currentPage: string;
  sortBy: Sort;
};

export const fetchPizzas = createAsyncThunk<Pizza[], sarchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { search, categoryId, currentPage, sortBy } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://63082d44722029d9ddc94328.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ``
      }&sortBy=${sortBy.sortProperty}&order=${sortBy.sort}${search}`
    );
    return data;
  }
);

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error"
}

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState: <PizzaSliceState>{
    items: [],
    status: "loading"
  },
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.items = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  }

  /*extraReducers: {
    [fetchPizzas.pending]: (state, action) => {
      state.items = [];
      state.status = "loading";
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = "error";
      state.items = [];
    }
  }*/
});

export const selectPizzaData = (state: RootState) => state.pizza;
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
