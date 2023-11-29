import {createPinia, setActivePinia} from "pinia";
import {beforeEach, describe, expect, it} from "vitest";
import {useAuthStore} from "@/core/stores/auth.store";

describe("Auth Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("isAuthenticated", () => {
    it("should return true", () => {
      const authStore = useAuthStore();
      authStore.jwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
        .eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ
        .SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`;

      const isAuthenticated = authStore.isAuthenticated();

      expect(isAuthenticated).toBeTruthy();
    });

    it("should return false", () => {
      const authStore = useAuthStore();
      authStore.jwt = "";

      const isAuthenticated = authStore.isAuthenticated();

      expect(isAuthenticated).toBeFalsy();
    });
  });

  describe("getCurrentUser", () => {
    it("should decode the JWT token", () => {
      const authStore = useAuthStore();
      authStore.jwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
        .eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ
        .SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`;

      const user = authStore.readJWT();

      expect(user).toEqual({
        alg: "HS256",
        typ: "JWT",
        sub: "1234567890",
        name: "John Doe",
        iat: 1516239022,
      });
    });
  });

  describe("logout", () => {
    it("should reset the JWT Token", async () => {
      const authStore = useAuthStore();
      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
        .eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ
        .SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`;
      authStore.jwt = token;

      await authStore.logout();

      expect(authStore.jwt).toEqual("");
    });
  });

  describe("login", () => {
    it("should set the JWT Token", () => {
      const authStore = useAuthStore();
      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
        .eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ
        .SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`;

      authStore.setJwt(token);

      expect(authStore.jwt).toEqual(token);
    });
  });
});
