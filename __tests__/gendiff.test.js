import fs from 'fs';
import path from 'path';
import genDiff from '../src';

test.each([['before.json', 'after.json'], ['before.yml', 'after.yml'], ['before.ini', 'after.ini']])(
  '%p and %p difference test', (before, after) => {
    const pathOfExpected = '__tests__/__fixtures__/res';
    const expected = fs.readFileSync(pathOfExpected, 'utf-8');
    const pathOfFixtures = '__tests__/__fixtures__';
    const beforePath = path.join(pathOfFixtures, before);
    const afterPath = path.join(pathOfFixtures, after);
    const actual = genDiff(beforePath, afterPath);
    expect(actual).toBe(expected);
  },
);
