import { SchemaDataType, Definitions, Properties } from '@/typings/schema';
import { SCHEMA_DATA_MAP } from '@/constants/schema';
import { HttpCode } from '@/constants/common';
import { DEFINITIONS_COMMENT } from './comment';
import { transferToBigCamelCase } from './';

export function generateTypeCode(
  operationId: string,
  type?: SchemaDataType,
  code?: HttpCode
) {
  if (!type) return '';

  return `type ${transferToBigCamelCase(operationId)}${code ?? ''} = ${
    SCHEMA_DATA_MAP[type]
  };\n\n`;
}

export function generateDefinitionsCode(definitions?: Definitions) {
  if (!definitions) return '';

  let result = DEFINITIONS_COMMENT;
  for (const interfaceName in definitions) {
    const { type, properties } = definitions[interfaceName];
    if (!properties) {
      result += generateTypeCode(interfaceName, type);
    } else {
      result += generateInterfaceCode(interfaceName, properties);
    }
  }

  return result;
}

function generateInterfaceCode(name: string, properties: Properties) {
  let result = `interface ${name} {\n`;

  for (const propertyName in properties) {
    const { type } = properties[propertyName];
    if (!type) continue;
    result += `  ${propertyName}: ${SCHEMA_DATA_MAP[type]};\n`
  }
  result += '}\n\n';

  return result;
}
