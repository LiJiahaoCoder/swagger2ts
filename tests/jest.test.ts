import { getOne } from '../src/utils/test';

describe('Test jest config', () => {
  test('should get true when call getOne', () => {
    expect(getOne()).toBeTruthy();
  });
});
