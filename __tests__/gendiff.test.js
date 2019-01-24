import fs from 'fs';
import path from 'path';
import genDiff from '../src';

describe('verify the result', () => {
  const pathOfExpected = '__tests__/__fixtures__/res';
  const expected = fs.readFileSync(pathOfExpected, 'utf-8');
  const pathOfFixtures = '__tests__/__fixtures__';
  const actualMake = (before, after) => {
    const beforePath = path.join(pathOfFixtures, before);
    const afterPath = path.join(pathOfFixtures, after);
    return genDiff(beforePath, afterPath);
  };
  it('JSON check', () => {
    const actual = actualMake('before.json', 'after.json');
    expect(actual).toBe(expected);
  });
  it('YAML check', () => {
    const actual = actualMake('before.yml', 'after.yml');
    expect(actual).toBe(expected);
  });
  it('INI check', () => {
    const actual = actualMake('before.ini', 'after.ini');
    expect(actual).toBe(expected);
  });
});
