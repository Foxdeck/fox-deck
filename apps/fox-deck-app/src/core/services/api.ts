/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface LoginResponseDto {
  accessToken: string;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface CreateUserRequestDto {
  email: string;
  username: string;
  password: string;
}

export interface CreateResourceRequestDto {
  parentResourceId: string;
  name: string;
  content: string;
  type: "note" | "folder";
}

export interface GetResourceByUserIdResponseDto {
  resourceId: string;
  parentResourceId: string;
  type: string;
  name: string;
  content: string;
  createdAt: string;
}

export interface GetResourceRootByUserIdResponseDto {
  resourceId: string;
  parentResourceId: string;
  type: string;
  name: string;
  content: string;
  createdAt: string;
}

export interface GetChildrenOfResourceResponseDto {
  resourceId: string;
  parentResourceId: string;
  type: string;
  name: string;
  content: string;
  createdAt: string;
}

export interface GetChildrenOfResourceRequestDto {
  resourceId: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title FoxDeck API
 * @version 1.0
 * @contact
 *
 * This API handles requests from the FoxDeck Applications
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  login = {
    /**
     * No description
     *
     * @tags Users
     * @name UserControllerGetUser
     * @request POST:/login
     */
    userControllerGetUser: (data: LoginRequestDto, params: RequestParams = {}) =>
      this.request<LoginResponseDto, any>({
        path: `/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  register = {
    /**
     * No description
     *
     * @tags Users
     * @name UserControllerCreateUser
     * @request POST:/register
     */
    userControllerCreateUser: (data: CreateUserRequestDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  createResource = {
    /**
     * No description
     *
     * @tags Resources
     * @name ResourceControllerCreateResource
     * @request POST:/create-resource
     * @secure
     */
    resourceControllerCreateResource: (data: CreateResourceRequestDto, params: RequestParams = {}) =>
      this.request<CreateResourceRequestDto, any>({
        path: `/create-resource`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  resource = {
    /**
     * No description
     *
     * @tags Resources
     * @name ResourceControllerGetResourceByUserId
     * @request GET:/resource
     * @secure
     */
    resourceControllerGetResourceByUserId: (params: RequestParams = {}) =>
      this.request<GetResourceByUserIdResponseDto[], any>({
        path: `/resource`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  resourceRoot = {
    /**
     * No description
     *
     * @tags Resources
     * @name ResourceControllerGetRootLevelResourceByUserId
     * @request GET:/resource-root
     * @secure
     */
    resourceControllerGetRootLevelResourceByUserId: (params: RequestParams = {}) =>
      this.request<GetResourceRootByUserIdResponseDto[], any>({
        path: `/resource-root`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  resourceChildren = {
    /**
     * No description
     *
     * @tags Resources
     * @name ResourceControllerGetChildrenOfResource
     * @request POST:/resource-children
     * @secure
     */
    resourceControllerGetChildrenOfResource: (data: GetChildrenOfResourceRequestDto, params: RequestParams = {}) =>
      this.request<GetChildrenOfResourceResponseDto[], any>({
        path: `/resource-children`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
