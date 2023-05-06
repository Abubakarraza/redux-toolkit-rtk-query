import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  getProductPending,
  getProductRejected,
  getProductSuccess,
} from "./productSlice";
export const ProductApi = createApi({
  reducerPath: "ProductsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "products",
      async onQueryStarted(id, { dispatch, queryFulfilled, getCacheEntry }) {
        const test = getCacheEntry();
        console.error("test:", test);
        dispatch(getProductPending());
        try {
          const { data } = await queryFulfilled;
          console.error("data:", data);
          dispatch(getProductSuccess(data.products));
        } catch (err) {
          dispatch(getProductRejected("Error fetching post!"));
        }
      },
    }),
    getProductsById: builder.query({
      query: (queryData) => {
        return `products/${queryData}`;
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(getProductPending());
        try {
          const { data } = await queryFulfilled;
          console.error("data:", data);
          dispatch(getProductSuccess(data.products));
        } catch (err) {
          dispatch(getProductRejected("Error fetching post!"));
        }
      },
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: "/products/add",
        method: "POST",
        body: JSON.stringify(product),
      }),
    }),
  }),
});
ProductApi.reducer;
export const {
  useGetAllProductsQuery,
  useGetProductsByIdQuery,
  useAddProductMutation,
} = ProductApi;
