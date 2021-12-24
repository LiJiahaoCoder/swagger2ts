import { parse } from '@/utils/parser';
import { Schema } from '@/typings/schema';

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

  test('Should get Http Method comment When call parse Given only baseUrl, path and http method in schema', () => {
    const schema: Schema = {
      ...SCHEMA,
      paths: {
        '/orders': {
          get: {
            responses: {},
          },
          post: {
            responses: {},
          },
          delete: {
            responses: {},
          },
          patch: {
            responses: {},
          },
          put: {
            responses: {},
          },
          options: {
            responses: {},
          },
        },
      },
    };
    const expected = `// Response\n\n// URI: /api/orders\n// GET\n// POST\n// DELETE\n// PATCH\n// PUT\n// OPTIONS\n`;

    expect(parse(schema)).toBe(expected);
  });
});
