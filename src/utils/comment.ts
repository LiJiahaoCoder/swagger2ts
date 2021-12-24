import { HttpCode, HttpMethod, HTTP_METHOD_MAP } from '@/constants/common';

export const RESPONSE_COMMENT = '// Response\n\n';

export function generatePathComment(uri: string) {
  return `// URI: ${uri}\n`;
}

export function generateMethodComment(method: HttpMethod) {
  return `// ${HTTP_METHOD_MAP[method]}\n`;
}

export function generateCodeComment(code: HttpCode) {
  return `// ${code}\n`;
}
