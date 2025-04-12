import { admin_url } from "../constants";
import { apiSlice } from "./apiSlice";

export const supplierApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => ({
        url: `${admin_url}/all-blogs`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllBreeds: builder.query({
      query: () => ({
        url: `${admin_url}/all-breeds`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllDogs: builder.query({
      query: () => ({
        url: `${admin_url}/all-dogs`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllUser: builder.query({
      query: () => ({
        url: `${admin_url}/all-users`,
        method: "GET",
        credentials: "include",
      }),
    }),
    banUser: builder.mutation({
      query: (id) => ({
        url: `${admin_url}/ban/${id}`,
        method: "PUT",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetAllBreedsQuery,
  useGetAllDogsQuery,
  useGetAllUserQuery,
  useBanUserMutation,
} = supplierApiSlice;
