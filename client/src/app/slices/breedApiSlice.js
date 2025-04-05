// api/breedApiSlice.js
import { breed_url } from "../constants";
import { apiSlice } from "./apiSlice";

export const breedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBreed: builder.mutation({
      query: (data) => ({
        url: `${breed_url}/add-breed`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    updateBreed: builder.mutation({
      query: (data) => ({
        url: `${breed_url}/update-breed/${data.id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    getAllBreeds: builder.query({
      query: () => ({
        url: `${breed_url}/all-breeds`,
        method: "GET",
        credentials: "include",
      }),
    }),

    getBreedById: builder.query({
      query: (id) => ({
        url: `${breed_url}/breed/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    getBreedsBySize: builder.query({
      query: (size) => ({
        url: `${breed_url}/by-size/${size}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    deleteBreed: builder.mutation({
      query: (id) => ({
        url: `${breed_url}/delete-breed/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useAddBreedMutation,
  useUpdateBreedMutation,
  useGetAllBreedsQuery,
  useGetBreedByIdQuery,
  useGetBreedsBySizeQuery,
  useDeleteBreedMutation,
} = breedApiSlice;
