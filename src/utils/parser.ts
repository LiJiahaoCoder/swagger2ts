import { Schema } from '@/typings/schema';

const COMMENT_PREFIX = '// URI:';

export function parse({ basePath, paths: pathDefinitions }: Schema) {
  const paths = Object.keys(pathDefinitions);
  if (!basePath && !paths.length) return '';

  let requestResult = '';
  let responseResult = '// Response\n\n';

  for (let i = 0; i < paths.length; ++i) {
    const p = basePath + paths[i];
    responseResult += generateComment(p);
  }

  return responseResult + requestResult;
}

function generateComment(content: string) {
  return `${COMMENT_PREFIX} ${content}\n`;
}
