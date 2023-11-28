import { JwtBody } from "./jwt-body.interface";

/**
 * Modified request which contains the decoded user on routes, where more security is needed.
 * @documentation this interface is referenced in the documentation, so if changes occur here, the documentation
 *                needs to be updated.
 */
export interface AuthenticatedRequest extends Request {
  user: JwtBody;
}
