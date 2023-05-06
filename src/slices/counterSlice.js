import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const incrementCount = createAsyncThunk("incrementCount", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.error("response:", response);
  return data;
});
const initialState = {
  count: 0,
  loading: false,
  catData: {},
};
export const counterSlice = createSlice({
  name: "CounterSlice",
  initialState,
  reducers: {
    increment: (state) => {
      return {
        ...state,
        count: state.count + 1,
      };
    },
    decrement: (state) => {
      return {
        ...state,
        count: state.count - 1,
      };
    },
    byValue: (state, action) => {
      return {
        ...state,
        count: (state.count += action.payload),
      };
    },
  },
  extraReducers: {
    [incrementCount.pending]: (state) => {
      state.loading = true;
    },
    [incrementCount.fulfilled]: (state, action) => {
      state.catData = action.payload;
    },
  },
});
export const { increment, decrement, byValue } = counterSlice.actions;
export default counterSlice.reducer;
