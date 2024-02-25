import {JwtService} from "@nestjs/jwt";
import {CallHandler, ExecutionContext, ForbiddenException, Injectable, Logger, NestInterceptor,} from "@nestjs/common";
import {catchError, Observable, throwError} from "rxjs";
import {SecurityType} from "../decorators/security.decorator";

/**
 * Interceptor which handles the security of REST-Endpoints.
 *
 * This interceptor validates the SecurityType from the @Security-Decorator.
 *
 * @example
 * ```
 *   @HttpCode(HttpStatus.CREATED)
 *   @Security(SecurityType.USER_VALID) <-- can only call createQuesttion if user is valid
 *   @Post("question")
 *   async createQuestion(
 *     @Body() data: CreateQuestionRequestDto,
 *   ): Promise<Question> {
 *     try {
 *       return this.questionService.createQuestion(data);
 *     } catch (e) {
 *       throw new InternalServerErrorException(e);
 *     }
 *   }
 * ```
 *  @see security.decorator.ts
 */
@Injectable()
export class SecurityInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // get the metadata of the @Security-Decorator, if @Security is not used, this is undefined.
    const securityType: SecurityType | undefined = Reflect.getMetadata(
      "securityType",
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;

    if (securityType === SecurityType.JWT_VALID) {
      try {
        const authorizationHeader = headers["authorization"];

        // because authorization has the form 'Bearer <JWT>' we need to use string.split here
        const jwt = authorizationHeader.split(" ")[1];
        const isJwtValid = this.jwtService.verify(jwt, {
          secret: process.env.JWT_SECRET,
        });

        if (!isJwtValid) {
          throw new ForbiddenException();
        }

        request.user = this.jwtService.decode(jwt);
      } catch (e) {
        const l = new Logger();
        l.error(e);
        throw new ForbiddenException();
      }
    }

    return next.handle().pipe(
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }
}
