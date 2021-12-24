import { Schema } from '@/typings/schema';
import { HttpMethod, HTTP_METHOD_MAP } from '@/constants/common';

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
      responseResult += generateMethodComment(method as HttpMethod);
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
