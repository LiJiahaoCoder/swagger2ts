import { Schema } from '@/typings/schema';
import { HttpCode, HttpMethod, HTTP_METHOD_MAP } from '@/constants/common';

export function parse({ basePath, paths: pathDefinitions }: Schema) {
  const paths = Object.keys(pathDefinitions);
  if (!basePath && !paths.length) return '';

  let requestResult = '';
  let responseResult = '// Response\n\n';

  for (let i = 0; i < paths.length; ++i) {
    const path = basePath + paths[i];
    const methodDefinitions = pathDefinitions[paths[i]];
    responseResult += generatePathComment(path);

    for (const method in methodDefinitions) {
      const methodDefinition = methodDefinitions[method as HttpMethod]!;

      responseResult += generateMethodComment(method as HttpMethod);

      const { responses } = methodDefinition;
      for (const httpCode in responses) {
        responseResult += generateCodeComment(httpCode as HttpCode);
      }
    }
  }

  return responseResult + requestResult;
}

function generatePathComment(uri: string) {
  return `// URI: ${uri}\n`;
}

function generateMethodComment(method: HttpMethod) {
  return `// ${HTTP_METHOD_MAP[method]}\n`;
}

function generateCodeComment(code: HttpCode) {
  return `// ${code}\n`;
}
