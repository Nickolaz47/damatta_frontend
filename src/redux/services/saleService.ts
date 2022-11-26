import { apiSlice } from "../api/apiSlice";
import { requestConfig } from "../config/requestConfig";
// Helpers
import handleError from "../helpers/handleError";

const saleService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSales: builder.query({
      query: () => requestConfig(`/rents/get`, "GET", null),
      transformResponse: (response: any) => response.rents,
      transformErrorResponse: (response) => handleError(response),
      providesTags: ["Rent"],
    }),
    getSaleById: builder.query({
      query: (rentId) => requestConfig(`/rents/${rentId}`, "GET", null),
      transformResponse: (response: any) => response.rent,
      transformErrorResponse: (response) => handleError(response),
      providesTags: ["Rent"],
    }),
    createSale: builder.mutation({
      query: (rent) => requestConfig(`/rents/create`, "POST", rent),
      transformErrorResponse: (response) => handleError(response),
      invalidatesTags: ["Rent"],
    }),
    updateSale: builder.mutation({
      query: ({ rentId, rent }) =>
        requestConfig(`/rents/${rentId}`, "UPDATE", rent),
      transformErrorResponse: (response) => handleError(response),
      invalidatesTags: ["Rent"],
    }),
    deleteSale: builder.mutation({
      query: (rentId) => requestConfig(`/rents/${rentId}`, "DELETE", null),
      transformErrorResponse: (response) => handleError(response),
      invalidatesTags: ["Rent"],
    }),
  }),
});

export const {
  useGetSalesQuery,
  useGetSaleByIdQuery,
  useCreateSaleMutation,
  useUpdateSaleMutation,
  useDeleteSaleMutation,
} = saleService;
