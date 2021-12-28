import { Schema } from '@/typings/schema';
import { HttpCode, HttpMethod } from '@/constants/common';
import {
  RESPONSE_COMMENT,
  generateCodeComment,
  generateMethodComment,
  generatePathComment,
} from './comment';
import { generateTypeCode } from './code';

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
        responseResult += generateTypeCode(
          operationId,
          httpCode as HttpCode,
          type
        );
      }
    }
  }

  return responseResult + requestResult;
}
