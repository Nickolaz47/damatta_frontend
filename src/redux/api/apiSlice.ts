// Redux
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Types
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
// Request
import { baseUrl } from "../config/requestConfig";

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 403) {
    // Send refresh token to get a new access token
    const refreshResult = await baseQuery("/token/refresh", api, extraOptions);
    if (refreshResult?.data) {
      // Retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
      return result;
    } else {
      await baseQuery("/logout", api, extraOptions);
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
