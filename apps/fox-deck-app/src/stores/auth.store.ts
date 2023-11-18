import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import qs from "qs";

/**
 * Store which contains the quiz of the current active questionnaire.
 */
export const useAuthStore = defineStore("authStore", () => {
  const jwt = ref<string>();

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

      return isAuthenticated();
    } catch (e) {
      return false;
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
    isAuthenticated: isAuthenticated,
  };
});
