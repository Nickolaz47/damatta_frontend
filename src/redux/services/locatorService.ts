import { apiSlice } from "../api/apiSlice";
import { requestConfig } from "../config/requestConfig";
// Helpers
import handleError from "../helpers/handleError";

const locatorService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLocators: builder.query({
      query: () => requestConfig(`/locators/get`, "GET", null),
      transformResponse: (response: any) => response.locators,
      transformErrorResponse: (response) => handleError(response),
      providesTags: ["Locator"],
    }),
    getLocatorById: builder.query({
      query: (locatorId) =>
        requestConfig(`/locators/${locatorId}`, "GET", null),
      transformErrorResponse: (response) => handleError(response),
      providesTags: ["Locator"],
    }),
    createLocator: builder.mutation({
      query: (locator) => requestConfig(`/locators/create`, "POST", locator),
      transformErrorResponse: (response) => handleError(response),
      invalidatesTags: ["Locator"],
    }),
    updateLocator: builder.mutation({
      query: ({ locatorId, locator }) =>
        requestConfig(`/locators/${locatorId}`, "PUT", locator),
      transformErrorResponse: (response) => handleError(response),
      invalidatesTags: ["Locator"],
    }),
    deleteLocator: builder.mutation({
      query: (locatorId) =>
        requestConfig(`/locators/${locatorId}`, "DELETE", null),
      transformErrorResponse: (response) => handleError(response),
      invalidatesTags: ["Locator"],
    }),
  }),
});

export const {
  useGetLocatorsQuery,
  useGetLocatorByIdQuery,
  useCreateLocatorMutation,
  useUpdateLocatorMutation,
  useDeleteLocatorMutation,
} = locatorService;
