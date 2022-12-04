import { apiSlice } from "../api/apiSlice";
import { requestConfig } from "../config/requestConfig";
// Helpers
import handleError from "../helpers/handleError";

const financeService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFinance: builder.query({
      query: () => requestConfig("/finance/balance", "GET", null),
      transformErrorResponse: (response) => handleError(response),
      providesTags: ["Finance", "Rent", "Sale", "Expense"],
    }),
  }),
});

export const { useGetFinanceQuery } = financeService;
