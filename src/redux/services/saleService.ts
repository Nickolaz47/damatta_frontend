import { apiSlice } from "../api/apiSlice";
import { requestConfig } from "../config/requestConfig";
// Helpers
import handleError from "../helpers/handleError";

const saleService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSales: builder.query({
      query: () => requestConfig(`/sales/get`, "GET", null),
      transformErrorResponse: (response) => handleError(response),
      providesTags: ["Sale"],
    }),
    getSaleById: builder.query({
      query: (saleId) => requestConfig(`/sales/${saleId}`, "GET", null),
      transformErrorResponse: (response) => handleError(response),
      providesTags: ["Sale"],
    }),
    createSale: builder.mutation({
      query: (sale) => requestConfig(`/sales/create`, "POST", sale),
      transformErrorResponse: (response) => handleError(response),
      invalidatesTags: ["Sale"],
    }),
    updateSale: builder.mutation({
      query: ({ saleId, sale }) =>
        requestConfig(`/sales/${saleId}`, "PUT", sale),
      transformErrorResponse: (response) => handleError(response),
      invalidatesTags: ["Sale"],
    }),
    deleteSale: builder.mutation({
      query: (saleId) => requestConfig(`/sales/${saleId}`, "DELETE", null),
      transformErrorResponse: (response) => handleError(response),
      invalidatesTags: ["Sale"],
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
