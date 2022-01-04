import { parse } from '@/utils/parser';
import { Schema } from '@/typings/schema';
import { HttpCode } from '@/constants/common';
import { SchemaDataEnum } from '@/constants/schema';

const SCHEMA: Schema = {
  basePath: '/api',
  paths: {
    '/orders': {},
    '/orders/{id}': {},
  },
};

describe('Parser test', () => {
  test('Should get empty result When call parse Given empty basePath and empty path', () => {
    expect(parse({ basePath: '', paths: {} })).toBeFalsy();
  });

  test('Should get URI comment When call parse Given only baseUrl and path in schema', () => {
    const expected = `// Response\n\n// URI: /api/orders\n// URI: /api/orders/{id}\n`;

    expect(parse({ ...SCHEMA })).toBe(expected);
  });

  test('Should get http method comment When call parse Given only baseUrl, path and http method in schema', () => {
    const schema: Schema = {
      ...SCHEMA,
      paths: {
        '/orders': {
          get: {
            operationId: 'getOrders',
            responses: {},
          },
          post: {
            operationId: 'postOrders',
            responses: {},
          },
          delete: {
            operationId: 'deleteOrders',
            responses: {},
          },
          patch: {
            operationId: 'patchOrders',
            responses: {},
          },
          put: {
            operationId: 'putOrders',
            responses: {},
          },
          options: {
            operationId: 'optionsOrders',
            responses: {},
          },
        },
      },
    };
    const expected = `// Response\n\n// URI: /api/orders\n// GET\n// POST\n// DELETE\n// PATCH\n// PUT\n// OPTIONS\n`;

    expect(parse(schema)).toBe(expected);
  });

  test('Should get http code comment When call parse Given only baseUrl, path, http method and http code in schema', () => {
    const schema: Schema = {
      ...SCHEMA,
      paths: {
        '/orders': {
          get: {
            operationId: 'getOrders',
            responses: {
              [HttpCode.OK]: {
                schema: {},
              },
              [HttpCode.NotFount]: {
                schema: {},
              },
            },
          },
          post: {
            operationId: 'postOrders',
            responses: {
              [HttpCode.Unauthorized]: {
                schema: {},
              },
            },
          },
        },
      },
    };
    const expected = `// Response\n\n// URI: /api/orders\n// GET\n// 200\n// 404\n// POST\n// 401\n`;

    expect(parse(schema)).toBe(expected);
  });

  test('Should get correct basic type When call parse Given string, integer, number, boolean, array, object definition in definitions', () => {
    const schema: Schema = {
      ...SCHEMA,
      paths: {
        '/orders': {
          get: {
            operationId: 'getOrders',
            responses: {
              [HttpCode.OK]: {
                schema: {
                  type: SchemaDataEnum.string,
                },
              },
              [HttpCode.NotFount]: {
                schema: {
                  type: SchemaDataEnum.boolean,
                },
              },
            },
          },
          post: {
            operationId: 'postOrders',
            responses: {
              [HttpCode.OK]: {
                schema: {
                  type: SchemaDataEnum.integer,
                },
              },
            },
          },
          delete: {
            operationId: 'deleteOrders',
            responses: {
              [HttpCode.OK]: {
                schema: {
                  type: SchemaDataEnum.number,
                },
              },
            },
          },
          patch: {
            operationId: 'patchOrders',
            responses: {
              [HttpCode.OK]: {
                schema: {
                  type: SchemaDataEnum.array,
                },
              },
            },
          },
          options: {
            operationId: 'optionsOrders',
            responses: {
              [HttpCode.OK]: {
                schema: {
                  type: SchemaDataEnum.object,
                },
              },
            },
          },
        },
      },
    };
    const expected = `// Response\n\n// URI: /api/orders\n// GET\n// 200\ntype GetOrders200 = string;\n\n// 404\ntype GetOrders404 = boolean;\n\n// POST\n// 200\ntype PostOrders200 = number;\n\n// DELETE\n// 200\ntype DeleteOrders200 = number;\n\n// PATCH\n// 200\ntype PatchOrders200 = any[];\n\n// OPTIONS\n// 200\ntype OptionsOrders200 = Record<string, any>;\n\n`;

    expect(parse(schema)).toBe(expected);
  });

  test('Should get correct definitions type When call parse Given basic type and object type in definitions', () => {
    const schema: Schema = {
      ...SCHEMA,
      definitions: {
        ResponseCode: {
          type: 'object',
          properties: {
            code: { type: 'number' },
            link: { type: 'string' },
          },
        },
        GeneratorInput: {
          type: 'object',
          properties: {
            spec: {
              type: 'object',
            },
            options: {
              type: 'array',
            },
            swaggerUrl: {
              type: 'string',
            },
          },
        },
        UrlMatcher: { type: 'string' },
        CliOption: { type: 'boolean' },
      },
    };
    const expected = `// Definitions\n\ninterface ResponseCode {\n  code: number;\n  link: string;\n}\n\ninterface GeneratorInput {\n  spec: Record<string, any>;\n  options: any[];\n  swaggerUrl: string;\n}\n\ntype UrlMatcher = string;\n\ntype CliOption = boolean;\n\n// Response\n\n// URI: /api/orders\n// URI: /api/orders/{id}\n`;

    expect(parse(schema)).toBe(expected);
  });

  test('Should get correct definitions type When call parse Given basic type and object without type in definitions', () => {
    const schema: Schema = {
      ...SCHEMA,
      definitions: {
        ResponseCode: {
          type: 'object',
          properties: {
            code: { type: 'number' },
            link: { type: 'string' },
          },
        },
        GeneratorInput: {
          type: 'object',
          properties: {
            spec: {
              type: 'object',
            },
            options: {},
            swaggerUrl: {},
          },
        },
        UrlMatcher: { type: 'string' },
        CliOption: { type: 'boolean' },
      },
    };
    const expected = `// Definitions\n\ninterface ResponseCode {\n  code: number;\n  link: string;\n}\n\ninterface GeneratorInput {\n  spec: Record<string, any>;\n}\n\ntype UrlMatcher = string;\n\ntype CliOption = boolean;\n\n// Response\n\n// URI: /api/orders\n// URI: /api/orders/{id}\n`;

    expect(parse(schema)).toBe(expected);
  });

  test('Should get correct definitions type When call parse Given $ref in path\'s schema', () => {
    const schema: Schema = {
      ...SCHEMA,
      paths: {
        '/orders': {
          get: {
            operationId: 'getOrders',
            responses: {
              [HttpCode.OK]: {
                schema: {
                  $ref: '#/definitions/ResponseCode'
                },
              },
            },
          },
        },
      },
      definitions: {
        ResponseCode: {
          type: 'object',
          properties: {
            code: { type: 'number' },
            link: { type: 'string' },
          },
        },
      },
    };
    const expected = `// Definitions\n\ninterface ResponseCode {\n  code: number;\n  link: string;\n}\n\n// Response\n\n// URI: /api/orders\n// GET\n// 200\ntype GetOrders200 = ResponseCode;\n\n`;

    expect(parse(schema)).toBe(expected);
  });
});
