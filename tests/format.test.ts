import { formatJSON } from '../src/utils/format';

const DEFINITIONS = {
  data: 'data',
  definitions: [],
  type: 'object',
};

describe('Format test', () => {
  test('Should get empty string When call formatJSON Given empty string', () => {
    expect(formatJSON('')).toBe('');
  });

  test('Should get formatted string When call formatJSON Given json string', () => {
    const jsonString = JSON.stringify(DEFINITIONS);

    expect(formatJSON(jsonString)).toBe(
      `{\n    "data": "data",\n    "definitions": [\n        \n    ],\n    "type": "object"\n}`
    );
  });

  test('Should get formatted string When call formatJSON Given array string in json string', () => {
    const jsonString = JSON.stringify({ ...DEFINITIONS, definitions: '["definition"]' });

    expect(formatJSON(jsonString)).toBe(
      `{\n    "data": "data",\n    "definitions": "[\\"definition\\"]",\n    "type": "object"\n}`
    );
  });

  test('Should get formatted string When call formatJSON Given , & : in json string', () => {
    const jsonString = JSON.stringify({ ...DEFINITIONS, definitions: ', test', extra: ': test' });

    expect(formatJSON(jsonString)).toBe(
      `{\n    "data": "data",\n    "definitions": ", test",\n    "type": "object",\n    "extra": ": test"\n}`
    );
  });
});
