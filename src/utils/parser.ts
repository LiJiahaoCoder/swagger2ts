import { Schema } from '@/typings/schema';
import { HttpCode, HttpMethod } from '@/constants/common';
import {
  RESPONSE_COMMENT,
  generateHttpCodeComment,
  generateHttpMethodComment,
  generatePathComment,
} from './comment';
import { generateTypeCode, generateDefinitionsCode } from './code';

export function parse({ basePath, paths: pathDefinitions, definitions }: Schema) {
  const paths = Object.keys(pathDefinitions);
  if (!basePath && !paths.length) return '';

  let requestResult = '';
  let responseResult = '';

  responseResult += generateDefinitionsCode(definitions);

  responseResult += RESPONSE_COMMENT;
  for (let i = 0; i < paths.length; ++ i) {
    const path = basePath + paths[i];
    const methodDefinitions = pathDefinitions[paths[i]];
    responseResult += generatePathComment(path);

    for (const method in methodDefinitions) {
      const methodDefinition = methodDefinitions[method as HttpMethod]!;

      responseResult += generateHttpMethodComment(method as HttpMethod);

      const { responses, operationId } = methodDefinition;
      for (const httpCode in responses) {
        responseResult += generateHttpCodeComment(httpCode as HttpCode);

        const {
          schema: { type },
        } = responses[httpCode as HttpCode]!;
        responseResult += generateTypeCode(
          operationId,
          type,
          httpCode as HttpCode
        );
      }
    }
  }

  return responseResult + requestResult;
}
