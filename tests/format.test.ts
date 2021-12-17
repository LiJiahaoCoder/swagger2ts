import { formatJSON } from '../src/utils/format';

describe('Format test', () => {
  test('Should get empty string When call formatJSON Given empty string', () => {
    expect(formatJSON('')).toBe('');
  });

  test('Should get formatted string When call formatJSON Given json string', () => {
    const jsonString = JSON.stringify({
      data: 'data',
      definitions: [],
      type: 'object',
    });

    expect(formatJSON(jsonString)).toBe(`{\n"data": "data",\n"definitions": [],\n"type": "object"\n}`);
  });
});
