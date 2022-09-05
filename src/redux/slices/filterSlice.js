import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    categoryId: 0,
    sort: {
      name: 'популярности',
      sortProperty: 'rating',
    },
  },
  redusers: {
    setCategoryId(state, action) {
      console.log(action.payload);
      state.categoryId = action.payload;
    },
  },
});

export const { setCategoryId } = filterSlice.actions;
export default filterSlice.reducer;
