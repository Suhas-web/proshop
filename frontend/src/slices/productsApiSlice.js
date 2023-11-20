import { PRODUCTS_URL } from "../constants";
import apiSlice from "./apiSlice";

const productsSliceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"], // retrive data for tag
    }),
    getProductsDetail: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: PRODUCTS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"], // clears cache of tag: product
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsDetailQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productsSliceApi;
