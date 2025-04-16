// api/dogApiSlice.js
import { dog_url } from "../constants";
import { apiSlice } from "./apiSlice";

export const dogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addDog: builder.mutation({
      query: (data) => ({
        url: `${dog_url}/add-dog`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    updateDog: builder.mutation({
      query: (data) => ({
        url: `${dog_url}/update-dog/${data.id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    getAllDogs: builder.query({
      query: () => ({
        url: `${dog_url}/all-dogs`,
        method: "GET",
        credentials: "include",
      }),
    }),

    getDogById: builder.query({
      query: (id) => ({
        url: `${dog_url}/dogs/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    getDogsByBreed: builder.query({
      query: (breedId) => ({
        url: `${dog_url}/dogs-by-breed/${breedId}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    deleteDog: builder.mutation({
      query: (id) => ({
        url: `${dog_url}/delete-dog/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    //kahlti completePayment
    completePayment: builder.mutation({
      query: ({ pidx, dogId }) => ({
        url: `${dog_url}/complete-payment?pidx=${pidx}`,
        method: "PUT",
        body: { dogId },
        credentials: "include",
      }),
    }),

    //kahlti initiatePayment
    initiatePayment: builder.mutation({
      query: (data) => ({
        url: `${dog_url}/initiate-payment`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useAddDogMutation,
  useUpdateDogMutation,
  useGetAllDogsQuery,
  useGetDogByIdQuery,
  useGetDogsByBreedQuery,
  useDeleteDogMutation,
  useCompletePaymentMutation,
  useInitiatePaymentMutation,
} = dogApiSlice;
