import fs from 'fs';
import genDiff from '../src';

test('verify the result', () => {
  const result = genDiff('./__fixtures__/before.js', './__fixtures__/after.js').toEqual();
  const correctResult = JSON.parse(fs.resFileSync('res'));
  expect(result).toEqual(correctResult);
});
