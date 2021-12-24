import { HttpMethod, HttpCode } from '@/constants/common';
import { type SchemaDataType } from './common';

export interface Schema {
  definitions?: Definitions;
  basePath: string;
  paths: Paths;
}

interface Definitions {
  [definition: string]: Definition;
}

interface Definition extends Property {
  properties?: Properties;
}

interface Properties {
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

type Path = Partial<{
  [httpMethod in HttpMethod]: {
    description?: string;
    // TODO: parse request parameters to typescript type
    parameters?: string[];
    responses: Responses;
  };
}>;

type Responses = Partial<{
  [httpCode in HttpCode]: Response;
}>;

interface Response {
  description?: string;
  schema: Property;
}
