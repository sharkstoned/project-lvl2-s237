import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const base = '__tests__/__fixtures__/flat';
const result = fs.readFileSync(path.resolve(base, 'result'), 'utf8');

test('flat JSON', () => {
  expect(genDiff(`${base}/json/before.json`, `${base}/json/after.json`)).toBe(result);
});

test('flat YAML', () => {
  expect(genDiff(`${base}/yaml/before.yml`, `${base}/yaml/after.yml`)).toBe(result);
});

test('flat INI', () => {
  expect(genDiff(`${base}/ini/before.ini`, `${base}/ini/after.ini`)).toBe(result);
});
