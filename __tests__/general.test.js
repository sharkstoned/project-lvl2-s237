import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const baseFlat = '__tests__/__fixtures__/flat';
const resultFlat = fs.readFileSync(path.resolve(baseFlat, 'result'), 'utf8');

test('flat JSON', () => {
  expect(genDiff(`${baseFlat}/json/before.json`, `${baseFlat}/json/after.json`)).toBe(resultFlat);
});

test('flat YAML', () => {
  expect(genDiff(`${baseFlat}/yaml/before.yml`, `${baseFlat}/yaml/after.yml`)).toBe(resultFlat);
});

test('flat INI', () => {
  expect(genDiff(`${baseFlat}/ini/before.ini`, `${baseFlat}/ini/after.ini`)).toBe(resultFlat);
});

const baseNested = '__tests__/__fixtures__/nested';
const resultNested = fs.readFileSync(path.resolve(baseNested, 'result'), 'utf8');

test('nested JSON', () => {
  expect(genDiff(`${baseNested}/json/before.json`, `${baseNested}/json/after.json`)).toBe(resultNested);
});

