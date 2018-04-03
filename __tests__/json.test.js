import path from 'path';
import fs from 'fs';
import genDiff from '../src';

test('genDiff works with flat JSON', () => {
  const base = '__tests__/__fixtures__/json';

  const before = path.resolve(base, 'before.json');
  const after = path.resolve(base, 'after.json');
  const result = fs.readFileSync(path.resolve(base, 'result'), 'utf8');

  expect(genDiff(before, after)).toBe(result);
});
