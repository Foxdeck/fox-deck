import {HttpStatusCode} from "axios";

import {Api} from "@/core/services/api";
import {Logger} from "@/core/util/logging.util";

export const api = new Api({
  baseURL: "/api"
});


/**
 * Interceptor for responses from the api.
 */
api.instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response.status;
    Logger.debug({
      filename: "interceptor",
      message: `intercept error with status-code '${status}'`
    });
    if (status === HttpStatusCode.Unauthorized) {
      // TODO: we should try a re-login or redirect to the login page
      // Authorization errors should be handled, by
      // Handle 401 errors
      return Promise.reject(error);
    }

    return Promise.resolve();
  }
);