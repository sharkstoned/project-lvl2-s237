import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const base = '__tests__/__fixtures__/flat';
const result = fs.readFileSync(path.resolve(base, 'result'), 'utf8');

test('flat JSON', () => {
  const before = path.resolve(base, 'json/before.json');
  const after = path.resolve(base, 'json/after.json');

  expect(genDiff(before, after)).toBe(result);
});

test('flat YAML', () => {
  const before = path.resolve(base, 'yaml/before.yml');
  const after = path.resolve(base, 'yaml/after.yml');

  expect(genDiff(before, after)).toBe(result);
});
