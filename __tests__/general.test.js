import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const base = '__tests__/__fixtures__/';

describe('tree', () => {
  const result = fs.readFileSync(path.resolve(base, 'results/tree'), 'utf8');

  test('JSON', () => {
    expect(genDiff(`${base}/input/json/before.json`, `${base}/input/json/after.json`)).toBe(result);
  });

  test('YAML', () => {
    expect(genDiff(`${base}/input/yaml/before.yml`, `${base}/input/yaml/after.yml`)).toBe(result);
  });

  test('INI', () => {
    expect(genDiff(`${base}/input/ini/before.ini`, `${base}/input/ini/after.ini`)).toBe(result);
  });
});

describe.skip('plain', () => {
  const result = fs.readFileSync(path.resolve(base, 'result/plain'), 'utf8');

  test('JSON', () => {
    expect(genDiff(`${base}/input/json/before.json`, `${base}/input/json/after.json`)).toBe(result);
  });

  test('YAML', () => {
    expect(genDiff(`${base}/input/yaml/before.yml`, `${base}/input/yaml/after.yml`)).toBe(result);
  });

  test('INI', () => {
    expect(genDiff(`${base}/input/ini/before.ini`, `${base}/input/ini/after.ini`)).toBe(result);
  });
});
