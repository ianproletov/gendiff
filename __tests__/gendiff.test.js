import fs from 'fs';
import genDiff from '../src';

test('verify the result', () => {
  const pathOfBefore = '__tests__/__fixtures__/before.json';
  const pathOfAfter = '__tests__/__fixtures__/after.json';
  const pathOfRes = '__tests__/__fixtures__/res';
  const actual = genDiff(pathOfBefore, pathOfAfter);
  const expected = fs.readFileSync(pathOfRes, 'utf-8');
  expect(actual).toBe(expected);
});
