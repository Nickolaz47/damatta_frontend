import { apiSlice } from "../api/apiSlice";
import { requestConfig } from "../config/requestConfig";
// Helpers
import handleError from "../helpers/handleError";

const authService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => requestConfig(`/login`, "POST", credentials),
      transformErrorResponse: (response) => handleError(response),
    }),
    logout: builder.mutation({
      query: () => requestConfig(`/logout`, "GET", {}),
      transformErrorResponse: (response) => handleError(response),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authService;
