import { multiply } from './main';

describe('Multiply function', () => {

  let result: number;

  // This runs before any assertions
  beforeAll(async () => {
    result = await multiply(2, 4);
  });

  it('Multiplies the first arg by the second', () => {
    expect(result).toBe(8);
  });
});
