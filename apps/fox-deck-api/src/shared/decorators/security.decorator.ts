import {SetMetadata} from '@nestjs/common';

export enum SecurityType {
    /**
     * No security validation at all, the same as leaving the @Security-Decorator away.
     */
    "NO_SECURE" = "NO_SECURE",

    /**
     * Validation of the JWT, which must be a valid JWT.
     */
    "JWT_VALID" = "JWT_VALID"
}

/**
 * Decorator which handles the security of an REST Endpoint. This will be validated by the security.interceptor.
 *
 * @param securityType {SecurityType} the security parameter
 * @see security.interceptor.ts
 * @constructor
 */
export const Security = (securityType: SecurityType) => {
    return (target, key, descriptor) => {
        SetMetadata('securityType', securityType)(target, key, descriptor);
    };
};