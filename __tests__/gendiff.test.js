import fs from 'fs';
import path from 'path';
import genDiff from '../src';
import { plainRender, defaultRender } from '../src/renderers';

describe.each(['simple', 'complex'])(
  'genDiff %p', (fixturesPath) => {
    describe.each(['.json', '.yml', '.ini'])(
      '%p difference test', (extension) => {
        it.each(['default', 'plain'])(
          '%p renderer', (rendertype) => {
            const renderers = {
              default: defaultRender,
              plain: plainRender,
            };
            const currentFixturesPath = path.join('__tests__/__fixtures__', fixturesPath);
            const beforePath = path.join(currentFixturesPath, `before${extension}`);
            const afterPath = path.join(currentFixturesPath, `after${extension}`);
            const pathOfExpected = path.join(currentFixturesPath, `res${rendertype}`);
            const expected = fs.readFileSync(pathOfExpected, 'utf-8');
            const actual = genDiff(beforePath, afterPath, renderers[rendertype]);
            expect(actual).toBe(expected);
          },
        );
      },
    );
  },
);
