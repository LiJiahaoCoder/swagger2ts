import { HttpMethod, HttpCode } from '@/constants/common';

/**
 * The data type of a schema
 * @type {string} Any strings also includes dates and files
 * @type {number} Any numbers also includes float and double type
 * @type {integer} Integer numbers also includes int32 and int64
 */
 export type SchemaDataType =
 | 'string'
 | 'number'
 | 'integer'
 | 'boolean'
 | 'array'
 | 'object';

export interface Schema {
  definitions?: Definitions;
  basePath: string;
  paths: Paths;
}

export interface Definitions {
  [definition: string]: Definition;
}

interface Definition extends Property {
  properties?: Properties;
}

export interface Properties {
  [property: string]: Property;
}

interface Property {
  $ref?: string;
  type?: SchemaDataType;
  nullable?: boolean;
  example?: string;
  description?: string;
}

interface Paths {
  [uri: string]: Path;
}

type Path = {
  [httpMethod in HttpMethod]?: {
    description?: string;
    // TODO: parse request parameters to typescript type
    parameters?: string[];
    responses: Responses;
    operationId: string;
  };
};

type Responses = {
  [httpCode in HttpCode]?: Response;
};

interface Response {
  description?: string;
  schema: Property;
}
