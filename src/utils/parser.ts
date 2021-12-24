import { Schema, SchemaDataType } from '@/typings/schema';
import { HttpCode, HttpMethod } from '@/constants/common';
import { SCHEMA_DATA_MAP } from '@/constants/schema';
import {
  RESPONSE_COMMENT,
  generateCodeComment,
  generateMethodComment,
  generatePathComment,
} from './comment';
import { transferToBigCamelCase } from './';

export function parse({ basePath, paths: pathDefinitions }: Schema) {
  const paths = Object.keys(pathDefinitions);
  if (!basePath && !paths.length) return '';

  let requestResult = '';
  let responseResult = RESPONSE_COMMENT;

  for (let i = 0; i < paths.length; ++i) {
    const path = basePath + paths[i];
    const methodDefinitions = pathDefinitions[paths[i]];
    responseResult += generatePathComment(path);

    for (const method in methodDefinitions) {
      const methodDefinition = methodDefinitions[method as HttpMethod]!;

      responseResult += generateMethodComment(method as HttpMethod);

      const { responses, operationId } = methodDefinition;
      for (const httpCode in responses) {
        responseResult += generateCodeComment(httpCode as HttpCode);

        const {
          schema: { type },
        } = responses[httpCode as HttpCode]!;
        responseResult += generateTsCode(
          operationId,
          httpCode as HttpCode,
          type
        );
      }
    }
  }

  return responseResult + requestResult;
}

function generateTsCode(
  operationId: string,
  code: HttpCode,
  type?: SchemaDataType
) {
  if (!type) return '';

  return `type ${transferToBigCamelCase(operationId)}${code} = ${
    SCHEMA_DATA_MAP[type]
  };\n\n`;
}
