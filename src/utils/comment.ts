import { HttpCode, HttpMethod, HTTP_METHOD_MAP } from '@/constants/common';

export const RESPONSE_COMMENT = '// Response\n\n';

export const DEFINITIONS_COMMENT = '// Definitions\n\n';

export function generatePathComment(uri: string) {
  return `// URI: ${uri}\n`;
}

export function generateHttpMethodComment(method: HttpMethod) {
  return `// ${HTTP_METHOD_MAP[method]}\n`;
}

export function generateHttpCodeComment(code: HttpCode) {
  return `// ${code}\n`;
}
