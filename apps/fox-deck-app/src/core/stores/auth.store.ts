import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
// @ts-ignore
import VueJwtDecode from "vue-jwt-decode";

/**
 * Stores information about the current logged-in user.
 */
export const useAuthStore = defineStore("authStore", () => {
  const jwt = useStorage<string>("authkey", null);

  /**
   * Parse the JWT Token to get basic information from the user.
   */
  const getCurrentUser = (): any => {
    if (isAuthenticated()) {
      return VueJwtDecode.decode(jwt.value);
    }
  };

  /**
   * Logs the user in and sets the jwt token.
   * @param token {string} the JWT of the user, coming from the back-end.
   */
  const login = (token: string) => {
    jwt.value = token;
  };

  /**
   * Returns if the user is currently logged in.
   */
  const isAuthenticated = (): boolean => {
    return !!jwt.value && jwt.value.length > 0;
  };

  /**
   * Public API
   */
  return {
    jwt: jwt,
    setJwt: login,
    isAuthenticated: isAuthenticated,
    getCurrentUser: getCurrentUser,
  };
});
