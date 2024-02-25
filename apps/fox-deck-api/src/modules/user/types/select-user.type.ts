/**
 * Represents a user object with basic information, selected at the login from the database.
 */
export type SelectUser = {
  id: string;
  username: string;
  email: string;
  password: string;
}