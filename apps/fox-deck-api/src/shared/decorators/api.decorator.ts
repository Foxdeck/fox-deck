import {applyDecorators, HttpCode, HttpStatus} from "@nestjs/common";
import {ApiBearerAuth, ApiExtraModels, ApiOkResponse, getSchemaPath} from "@nestjs/swagger";
import {Security, SecurityType} from "./security.decorator";

type FoxdeckApiResponseDecoratorOptions = {
    responseDescription: string;
    schema: any // needs to be a class
}
/**
 * FoxdeckApiResponse is a function that generates decorators for API responses.
 *
 * It's used for making the code more readable, by defining a smaller api for describing Responses.
 *
 * @param {FoxdeckApiResponseDecoratorOptions} options - The options for generating the decorators.
 *
 * @example
 *
 * ```typescript
 * // use the decorator in NestJS Controller if you want to describe the response.
 * @FoxdeckApiResponse({
 *   responseDescription: "The created folder.",
 *   schema: CreateFolderResponseDto
 * })
 * ```
 */
export const FoxdeckApiResponse = (options: FoxdeckApiResponseDecoratorOptions) => {
    return applyDecorators(
        ApiOkResponse({
            description: options.responseDescription,
            schema: {
                $ref: getSchemaPath(options.schema),
            },
        }) as PropertyDecorator,
        ApiExtraModels(options.schema) as PropertyDecorator
    )
}


/**
 * Represents the options for decorating a Foxdeck API request.
 */
type FoxdeckApiRequestDecoratorOptions = {
    /**
     * Represents the HTTP status code.
     */
    httpCode: HttpStatus;
    /**
     * The type of security for the endpoint.
     * If this is set, '@ApiBearerAuth' will automatically be added to the request.
     */
    securityType?: SecurityType
}

export const FoxdeckApiRequest = (options: FoxdeckApiRequestDecoratorOptions) => {
    const decorators = [];

    if (options.securityType) {
        // this decorator is important to check the authentication in the interceptor
        decorators.push(Security(options.securityType));
        // this decorator is only important for the swagger documentation
        decorators.push(ApiBearerAuth("access-token"));
    }

    decorators.push(HttpCode(options.httpCode));

    return applyDecorators(...decorators);
}

