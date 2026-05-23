// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Object Utilities @chromium', () => {

  test('Object.keys returns own keys', async () => {
    expect(Object.keys({ a: 1, b: 2 })).toEqual(['a', 'b']);
  });

  test('Object.values returns own values', async () => {
    expect(Object.values({ a: 1, b: 2 })).toEqual([1, 2]);
  });

  test('Object.entries pairs keys and values', async () => {
    expect(Object.entries({ a: 1 })).toEqual([['a', 1]]);
  });

  test('Object.fromEntries reverses entries', async () => {
    expect(Object.fromEntries([['a', 1], ['b', 2]])).toEqual({ a: 1, b: 2 });
  });

  test('spread merges objects', async () => {
    const merged = { ...{ a: 1 }, ...{ b: 2 } };
    expect(merged).toEqual({ a: 1, b: 2 });
  });

  test('spread later keys win', async () => {
    const merged = { ...{ a: 1 }, ...{ a: 2 } };
    expect(merged).toEqual({ a: 1 }); // intentional failure
  });

  test('Object.assign shallow copies', async () => {
    const target = { a: 1 };
    Object.assign(target, { b: 2 });
    expect(target).toEqual({ a: 1, b: 2 });
  });

  test('destructuring with default', async () => {
    const { x = 10 } = {};
    expect(x).toBe(10);
  });

  test('destructuring rename', async () => {
    const { a: renamed } = { a: 7 };
    expect(renamed).toBe(7);
  });

  test('rest in destructuring', async () => {
    const { a, ...rest } = { a: 1, b: 2, c: 3 };
    expect(a).toBe(1);
    expect(rest).toEqual({ b: 2, c: 3 });
  });

  test('in operator detects property', async () => {
    expect('a' in { a: 1 }).toBe(true);
    expect('b' in { a: 1 }).toBe(false);
  });

  test('hasOwnProperty distinguishes inherited', async () => {
    const obj = { a: 1 };
    expect(Object.prototype.hasOwnProperty.call(obj, 'a')).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(obj, 'toString')).toBe(false);
  });

  test('Object.freeze prevents mutation', async () => {
    const obj = Object.freeze({ a: 1 });
    obj.a = 2;
    expect(obj.a).toBe(1);
  });

});

test.describe('JSON Operations @chromium', () => {

  test('JSON.stringify primitives', async () => {
    expect(JSON.stringify({ a: 1, b: 'two' })).toBe('{"a":1,"b":"two"}');
  });

  test('JSON.parse round-trip', async () => {
    const obj = { a: 1, b: [2, 3], c: { d: 4 } };
    expect(JSON.parse(JSON.stringify(obj))).toEqual(obj);
  });

  test('JSON.stringify drops undefined', async () => {
    expect(JSON.stringify({ a: 1, b: undefined })).toBe('{"a":1}');
  });

  test('JSON.stringify with indent', async () => {
    expect(JSON.stringify({ a: 1 }, null, 2)).toBe('{\n  "a": 1\n}');
  });

  test('JSON.stringify with replacer array', async () => {
    expect(JSON.stringify({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toBe('{"a":1,"c":3}');
  });

  test('JSON.parse handles arrays', async () => {
    expect(JSON.parse('[1,2,3]')).toEqual([1, 2, 3]);
  });

  test('JSON.parse handles null', async () => {
    expect(JSON.parse('null')).toBe(null);
  });

  test('JSON.parse throws on invalid', async () => {
    expect(() => JSON.parse('{invalid}')).toThrow();
  });

  test('JSON.stringify nested arrays', async () => {
    expect(JSON.stringify([[1, 2], [3, 4]])).toBe('[[1,2],[3,4]]');
  });

  test('JSON.parse with reviver', async () => {
    const result = JSON.parse('{"a":1,"b":2}', (k, v) => typeof v === 'number' ? v * 2 : v);
    expect(result).toEqual({ a: 2, b: 5 }); // intentional failure
  });

});
