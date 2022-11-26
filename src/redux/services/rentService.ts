import { apiSlice } from "../api/apiSlice";
import { requestConfig } from "../config/requestConfig";
// Helpers
import handleError from "../helpers/handleError";

const rentService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRents: builder.query({
      query: () => requestConfig(`/rents/get`, "GET", null),
      transformErrorResponse: (response) => handleError(response),
      transformResponse: (response: any) => response.rents,
      providesTags: ["Rent"],
    }),
    getRentById: builder.query({
      query: (rentId) => requestConfig(`/rents/${rentId}`, "GET", null),
      transformErrorResponse: (response) => handleError(response),
      transformResponse: (response: any) => response.rent,
      providesTags: ["Rent"],
    }),
    createRent: builder.mutation({
      query: (rent) => requestConfig(`/rents/create`, "POST", rent),
      transformErrorResponse: (response) => handleError(response),
      invalidatesTags: ["Rent"],
    }),
    updateRent: builder.mutation({
      query: ({ rentId, rent }) =>
        requestConfig(`/rents/${rentId}`, "PUT", rent),
      transformErrorResponse: (response) => handleError(response),
      invalidatesTags: ["Rent"],
    }),
    deleteRent: builder.mutation({
      query: (rentId) => requestConfig(`/rents/${rentId}`, "DELETE", null),
      transformErrorResponse: (response) => handleError(response),
      invalidatesTags: ["Rent"],
    }),
  }),
});

export const {
  useGetRentsQuery,
  useGetRentByIdQuery,
  useCreateRentMutation,
  useUpdateRentMutation,
  useDeleteRentMutation,
} = rentService;
