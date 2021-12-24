/**
 * The data type of a schema
 * @type {string} Any strings also includes dates and files
 * @type {number} Any numbers also includes float and double type
 * @type {integer} Integer numbers also includes int32 and int64
 */
export type SchemaDataType =
  | 'string'
  | 'number'
  | 'integer'
  | 'boolean'
  | 'array'
  | 'object';
