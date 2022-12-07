import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, sarchPizzaParams } from "./types";

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
