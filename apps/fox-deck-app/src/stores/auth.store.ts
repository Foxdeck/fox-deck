import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import axios from "axios";
// @ts-ignore
import VueJwtDecode from "vue-jwt-decode";

/**
 * Store which contains the quiz of the current active questionnaire.
 */
export const useAuthStore = defineStore("authStore", () => {
  const LS_KEY_JWT = "authKey";

  const jwt = ref<string>();

  onMounted(() => {
    // TODO: this should only happens, if "keep me logged in" was selected
    const localJwtKey = localStorage.getItem(LS_KEY_JWT);
    if (localJwtKey) {
      jwt.value = localJwtKey;
    }
  });

  /**
   * Login the user
   * @param email {string} the email of the user
   * @param password {string} the password of the user
   * @return if the user is authenticated
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      jwt.value = await res.data?.access_token;

      // TODO: this should only happens, if "keep me logged in" was selected
      if (jwt.value) {
        localStorage.setItem(LS_KEY_JWT, jwt.value);
      }

      return isAuthenticated();
    } catch (e) {
      return false;
    }
  };

  /**
   * Register the user
   * @param email {string} the email of the user
   * @param username {string} the username of the user
   * @param password {string} the password of the user
   * @return if the user is authenticated
   */
  const register = async (
    email: string,
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      await axios.post(
        "http://localhost:3000/register",
        { email, password, username },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return true;
    } catch (e) {
      return false;
    }
  };

  const getCurrentUser = (): any => {
    if (isAuthenticated()) {
      return VueJwtDecode.decode(jwt.value);
    }
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
    login: login,
    register: register,
    isAuthenticated: isAuthenticated,
    getCurrentUser: getCurrentUser,
  };
});
