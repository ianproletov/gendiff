import fs from 'fs';
import genDiff from '../src';

describe('verify the result', () => {
  const pathOfExpected = '__tests__/__fixtures__/res';
  it('JSON check', () => {
    const actual = genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json');
    const expected = fs.readFileSync(pathOfExpected, 'utf-8');
    expect(actual).toBe(expected);
  });
  it('YAML check', () => {
    const actual = genDiff('__tests__/__fixtures__/before.yml', '__tests__/__fixtures__/after.yml');
    const expected = fs.readFileSync(pathOfExpected, 'utf-8');
    expect(actual).toBe(expected);
  });
});
