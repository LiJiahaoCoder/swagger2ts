import { transferToBigCamelCase } from '@/utils';

describe('Utils test', () => {
  test('Should get A When call transferToBigCamelCase Given a', () => {
    expect(transferToBigCamelCase('a')).toBe('A');
  });

  test('Should get BigCamelCase When call transferToBigCamelCase Given bigCamelCase', () => {
    expect(transferToBigCamelCase('bigCamelCase')).toBe('BigCamelCase');
  });
});
