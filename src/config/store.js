import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import counterSlice from "../slices/counterSlice";
import { ProductApi } from "../slices/sliceApi";
import productSlice from "../slices/productSlice";
import { ContactApi } from "../slices/api/ContactSliceApi";
export const store = configureStore({
  reducer: {
    counterSlice,
    productSlice,
    [ProductApi.reducerPath]: ProductApi.reducer,
    [ContactApi.reducerPath]: ContactApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ProductApi.middleware, ContactApi.middleware),
});
setupListeners(store.dispatch);
