import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    categoryId: 0,
    currentPage: 1,
    sort: {
      name: 'популярности',
      sortProperty: 'rating',
      sort: 'desc',
    },
  },
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
    },
  },
});
export const selectFilter = (state) => state.filter;
export const selectSort = (state) => state.filter.sort;
export const { setCategoryId, setSort, setCurrentPage, setFilters } =
  filterSlice.actions;
export default filterSlice.reducer;
