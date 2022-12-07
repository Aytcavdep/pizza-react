import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceState, SortPropertyEnum, SortEnum, Sort } from "./types";

export const filterSlice = createSlice({
  name: "filters",
  initialState: <FilterSliceState>{
    searchValue: "",
    categoryId: 0,
    currentPage: 1,
    sort: {
      name: "популярности",
      sortProperty: SortPropertyEnum.RATING,
      sort: SortEnum.DESC
    }
  },
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
    }
  }
});
export const {
  setCategoryId,
  setSearchValue,
  setSort,
  setCurrentPage,
  setFilters
} = filterSlice.actions;
export default filterSlice.reducer;
