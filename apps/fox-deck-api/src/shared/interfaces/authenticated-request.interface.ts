import { JwtBody } from "./jwt-body.interface";

/**
 * Modified request which contains the decoded user on routes, where more security is needed.
 */
export interface AuthenticatedRequest extends Request {
  user: JwtBody;
}
