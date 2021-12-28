import { SchemaDataType } from '@/typings/schema';

export enum SchemaDataEnum {
  string = 'string',
  number = 'number',
  integer = 'integer',
  boolean = 'boolean',
  array = 'array',
  object = 'object',
}

export const SCHEMA_DATA_MAP: Record<SchemaDataEnum, string> = {
  [SchemaDataEnum.string]: 'string',
  [SchemaDataEnum.number]: 'number',
  [SchemaDataEnum.integer]: 'number',
  [SchemaDataEnum.boolean]: 'boolean',
  [SchemaDataEnum.array]: 'any[]',
  [SchemaDataEnum.object]: 'Record<string, any>',
};

export const GENERIC_TYPES: SchemaDataType[] = ['string', 'number', 'integer', 'boolean'];
