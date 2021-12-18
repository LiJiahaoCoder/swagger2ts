import { formatJSON } from '../src/utils/formatter';

const DEFINITIONS = {
  data: 'data',
  definitions: [],
  type: 'object',
};

describe('Formatter test', () => {
  test('Should get empty string When call formatJSON Given empty string', () => {
    expect(formatJSON('')).toBe('');
  });

  test('Should get formatted string When call formatJSON Given json string', () => {
    const jsonString = JSON.stringify(DEFINITIONS);
    const expected = `{\n    "data": "data",\n    "definitions": [\n        \n    ],\n    "type": "object"\n}`;

    expect(formatJSON(jsonString)).toBe(expected);
  });

  test('Should get formatted string When call formatJSON Given array string in json string', () => {
    const jsonString = JSON.stringify({
      ...DEFINITIONS,
      definitions: '["definition"]',
    });
    const expected = `{\n    "data": "data",\n    "definitions": "[\\"definition\\"]",\n    "type": "object"\n}`;

    expect(formatJSON(jsonString)).toBe(expected);
  });

  test('Should get formatted string When call formatJSON Given , & : in json string', () => {
    const jsonString = JSON.stringify({
      ...DEFINITIONS,
      definitions: ', test',
      extra: ': test',
    });
    const expected = `{\n    "data": "data",\n    "definitions": ", test",\n    "type": "object",\n    "extra": ": test"\n}`;

    expect(formatJSON(jsonString)).toBe(expected);
  });
});
