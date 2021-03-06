import { SchemaDataType, Definitions, Properties } from '@/typings/schema';
import { SCHEMA_DATA_MAP } from '@/constants/schema';
import { HttpCode } from '@/constants/common';
import { DEFINITIONS_COMMENT } from './comment';
import { transferToBigCamelCase } from './';

export function generateTypeCode(
  operationId: string,
  type?: string,
  code?: HttpCode
) {
  if (!type) return '';

  return `type ${transferToBigCamelCase(operationId)}${code ?? ''} = ${type};\n\n`;
}

export function generateBasicTypeCode(
  operationId: string,
  type?: SchemaDataType,
  code?: HttpCode
) {
  return generateTypeCode(
    operationId,
    type ? SCHEMA_DATA_MAP[type] : type,
    code,
  );
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

export function getRefName ($ref: string) {
  const splitted = $ref.split('/');

  return splitted[splitted.length - 1];
}

export function generateDefinitionsCode(definitions?: Definitions) {
  if (!definitions) return '';

  let result = DEFINITIONS_COMMENT;
  for (const interfaceName in definitions) {
    const { $ref, type, properties } = definitions[interfaceName];

    if ($ref) {
      result += generateTypeCode(interfaceName, getRefName($ref));
    } else if (!properties) {
      result += generateBasicTypeCode(interfaceName, type);
    } else {
      result += generateInterfaceCode(interfaceName, properties);
    }
  }

  return result;
}
