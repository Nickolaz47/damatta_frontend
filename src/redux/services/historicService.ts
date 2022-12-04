import { apiSlice } from "../api/apiSlice";
import { requestConfig } from "../config/requestConfig";
// Helpers
import handleError from "../helpers/handleError";

const historicService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHistoric: builder.query({
      query: () => requestConfig("", "GET", null),
      transformErrorResponse: (response) => handleError(response),
      providesTags: ["Historic"],
    }),
    createHistoric: builder.mutation({
      query: () => requestConfig("", "POST", null),
      transformErrorResponse: (response) => handleError(response),
      invalidatesTags: ["Historic"],
    }),
  }),
});

export const { useGetHistoricQuery, useCreateHistoricMutation } =
  historicService;
