import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  products: [],
  error: "",
};
export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    getProductPending: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    getProductSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    },
    getProductRejected: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload || "Something Went Wrong",
      };
    },
  },
});
export const { getProductPending, getProductRejected, getProductSuccess } =
  productSlice.actions;
export default productSlice.reducer;
