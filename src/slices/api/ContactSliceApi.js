import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ContactApi = createApi({
  reducerPath: "ContactApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    getAllContact: builder.query({
      query: () => "people",
    }),
    getContact: builder.query({
      query: (id) => ({
        url: `/people/${id}`,
      }),
    }),
    addContact: builder.mutation({
      query: (contact) => ({
        url: "/people",
        method: "POST",
        body: contact,
      }),
    }),
    updateContact: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/people/${id}`,
        method: "PUT",
        body: rest,
      }),
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/people/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useGetAllContactQuery,
  useGetContactQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
  usePrefetch,
} = ContactApi;
