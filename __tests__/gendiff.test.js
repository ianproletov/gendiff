import fs from 'fs';
import genDiff from '../src';

describe('verify the result', () => {
  it('JSON check', () => {
    const pathOfBefore = '__tests__/__fixtures__/before.json';
    const pathOfAfter = '/mnt/c/myProjects/gendiff/__tests__/__fixtures__/after.json';
    const pathOfRes = '__tests__/__fixtures__/res';
    const actual = genDiff(pathOfBefore, pathOfAfter);
    const expected = fs.readFileSync(pathOfRes, 'utf-8');
    expect(actual).toBe(expected);
  });
  it('YAML check', () => {
    const pathOfBefore = '__tests__/__fixtures__/before.yml';
    const pathOfAfter = '__tests__/__fixtures__/after.yml';
    const pathOfRes = '__tests__/__fixtures__/res';
    const actual = genDiff(pathOfBefore, pathOfAfter);
    const expected = fs.readFileSync(pathOfRes, 'utf-8');
    expect(actual).toBe(expected);
  });
});
