import { Schema, Responses } from '@/typings/schema';
import { HttpCode, HttpMethod } from '@/constants/common';
import {
  RESPONSE_COMMENT,
  generateHttpCodeComment,
  generateHttpMethodComment,
  generatePathComment,
} from './comment';
import {
  getRefName,
  generateTypeCode,
  generateBasicTypeCode,
  generateDefinitionsCode,
} from './code';

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
        responseResult = generateResponseType(
          responseResult,
          httpCode as HttpCode,
          operationId,
          responses,
        );
      }
    }
  }

  return responseResult + requestResult;
}

function generateResponseType(result: string, httpCode: HttpCode, operationId: string, responses: Responses) {
  let _result = result;
  _result += generateHttpCodeComment(httpCode);

  const {
    schema: { $ref, type },
  } = responses[httpCode]!;
  const refType = $ref ? getRefName($ref) : $ref;
  _result += refType ? generateTypeCode(
    operationId,
    refType,
    httpCode
  ) : generateBasicTypeCode(
    operationId,
    type,
    httpCode
  );

  return _result;
}
