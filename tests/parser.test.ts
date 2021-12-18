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
});
