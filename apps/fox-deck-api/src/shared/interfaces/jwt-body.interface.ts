/**
 * Contains the body (content) of the JWT.
 * @documentation this interface is referenced in the documentation, so if changes occur here, the documentation
 *                needs to be updated.
 */
export interface JwtBody {
  id: string;
  email: string;
  username: string;
}
