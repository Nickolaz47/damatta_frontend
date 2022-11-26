import { apiSlice } from "../api/apiSlice";
import { requestConfig } from "../config/requestConfig";
// Helpers
import handleError from "../helpers/handleError";

const renterService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRenters: builder.query({
      query: () => requestConfig(`/renters/get`, "GET", null),
      transformResponse: (response: any) => response.renters,
      transformErrorResponse: (response) => handleError(response),
      providesTags: ["Renter"],
    }),
    getRenterById: builder.query({
      query: (renterId) => requestConfig(`/renters/${renterId}`, "GET", null),
      transformResponse: (response: any) => response.renter,
      transformErrorResponse: (response) => handleError(response),
      providesTags: ["Renter"],
    }),
    createRenter: builder.mutation({
      query: (renter) => requestConfig(`/renters/create`, "POST", renter),
      transformErrorResponse: (response) => handleError(response),
      invalidatesTags: ["Renter"],
    }),
    updateRenter: builder.mutation({
      query: ({ renterId, renter }) =>
        requestConfig(`/renters/${renterId}`, "PUT", renter),
      transformErrorResponse: (response) => handleError(response),
      invalidatesTags: ["Renter"],
    }),
    deleteRenter: builder.mutation({
      query: (renterId) =>
        requestConfig(`/renters/${renterId}`, "DELETE", null),
      transformErrorResponse: (response) => handleError(response),
      invalidatesTags: ["Renter"],
    }),
  }),
});

export const {
  useGetRentersQuery,
  useGetRenterByIdQuery,
  useCreateRenterMutation,
  useUpdateRenterMutation,
  useDeleteRenterMutation,
} = renterService;
