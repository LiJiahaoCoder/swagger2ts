import { SchemaDataType } from '@/typings/schema';
import { SCHEMA_DATA_MAP } from '@/constants/schema';
import { HttpCode } from '@/constants/common';
import { transferToBigCamelCase } from './';

export function generateTypeCode(
  operationId: string,
  code: HttpCode,
  type?: SchemaDataType
) {
  if (!type) return '';

  return `type ${transferToBigCamelCase(operationId)}${code}=${
    SCHEMA_DATA_MAP[type]
  };\n\n`;
}
