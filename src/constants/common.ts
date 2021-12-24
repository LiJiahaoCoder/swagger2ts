export enum HttpMethod {
  GET = 'get',
  HEAD = 'head',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  CONNECT = 'connect',
  OPTIONS = 'options',
  TRACE = 'trace',
  PATCH = 'patch',
}

export const HTTP_METHOD_MAP: Record<HttpMethod, string> = {
  [HttpMethod.GET]: 'GET',
  [HttpMethod.HEAD]: 'HEAD',
  [HttpMethod.POST]: 'POST',
  [HttpMethod.PUT]: 'PUT',
  [HttpMethod.DELETE]: 'DELETE',
  [HttpMethod.CONNECT]: 'CONNECT',
  [HttpMethod.OPTIONS]: 'OPTIONS',
  [HttpMethod.TRACE]: 'TRACE',
  [HttpMethod.PATCH]: 'PATCH',
};

export enum HttpCode {
  OK = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  NotModified = 304,
  TemporaryRedirect = 307,
  PermanentRedirect = 308,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFount = 404,
  MethodNotAllowed = 405,
  RequestTimeout = 408,
  InternalServerError = 500,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
}

export enum SchemaDataSchema {
  string = 'string',
  number = 'number',
  integer = 'integer',
  boolean = 'boolean',
  array = 'array',
  object = 'object',
}
