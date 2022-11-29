import { apiSlice } from "../api/apiSlice";
import { requestConfig } from "../config/requestConfig";
// Helpers
import handleError from "../helpers/handleError";

const expenseService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: () => requestConfig("/expenses/get", "GET", null),
      transformErrorResponse: (response) => handleError(response),
      providesTags: ["Expense"],
    }),
    getExpenseById: builder.query({
      query: (expenseId) =>
        requestConfig(`/expenses/${expenseId}`, "GET", null),
      transformErrorResponse: (response) => handleError(response),
      providesTags: ["Expense"],
    }),
    createExpense: builder.mutation({
      query: (expense) => requestConfig("/expenses/create", "POST", expense),
      transformErrorResponse: (response) => handleError(response),
      invalidatesTags: ["Expense"],
    }),
    updateExpense: builder.mutation({
      query: ({ expenseId, expense }) =>
        requestConfig(`/expenses/${expenseId}`, "PUT", expense),
      transformErrorResponse: (response) => handleError(response),
      invalidatesTags: ["Expense"],
    }),
    deleteExpense: builder.mutation({
      query: (expenseId) =>
        requestConfig(`/expenses/${expenseId}`, "DELETE", null),
      transformErrorResponse: (response) => handleError(response),
      invalidatesTags: ["Expense"],
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useGetExpenseByIdQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseService;
