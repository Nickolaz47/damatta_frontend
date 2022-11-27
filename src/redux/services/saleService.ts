import { apiSlice } from "../api/apiSlice";
import { requestConfig } from "../config/requestConfig";
// Helpers
import handleError from "../helpers/handleError";

const saleService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSales: builder.query({
      query: () => requestConfig(`/sales/get`, "GET", null),
      transformErrorResponse: (response) => handleError(response),
      providesTags: ["Rent"],
    }),
    getSaleById: builder.query({
      query: (rentId) => requestConfig(`/sales/${rentId}`, "GET", null),
      transformErrorResponse: (response) => handleError(response),
      providesTags: ["Rent"],
    }),
    createSale: builder.mutation({
      query: (rent) => requestConfig(`/sales/create`, "POST", rent),
      transformErrorResponse: (response) => handleError(response),
      invalidatesTags: ["Rent"],
    }),
    updateSale: builder.mutation({
      query: ({ rentId, rent }) =>
        requestConfig(`/sales/${rentId}`, "UPDATE", rent),
      transformErrorResponse: (response) => handleError(response),
      invalidatesTags: ["Rent"],
    }),
    deleteSale: builder.mutation({
      query: (rentId) => requestConfig(`/sales/${rentId}`, "DELETE", null),
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
