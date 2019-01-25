import fs from 'fs';
import path from 'path';
import genDiff from '../src';

describe.each(['simple', 'complex'])(
  'genDiff %p', (fixturesPath) => {
    it.each(['.json', '.yml', '.ini'])(
      '%p difference test', (extension) => {
        const currentFixturesPath = path.join('__tests__/__fixtures__', fixturesPath);
        const pathOfExpected = path.join(currentFixturesPath, 'res');
        const expected = fs.readFileSync(pathOfExpected, 'utf-8');
        const beforePath = path.join(currentFixturesPath, `before${extension}`);
        const afterPath = path.join(currentFixturesPath, `after${extension}`);
        const actual = genDiff(beforePath, afterPath);
        expect(actual).toBe(expected);
      },
    );
  },
);
