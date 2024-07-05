import {HttpStatusCode} from "axios";

import {Api} from "@/core/services/api";

export const api = new Api({
  baseURL: "/api"
});



// TODO: improve this interceptor
api.instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === HttpStatusCode.Unauthorized) {
      // TODO: we should try a re-login or redirect to the login page
      // Handle 401 errors
    }

    return Promise.reject(error);
  }
);