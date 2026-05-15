// @ts-check
import { test, expect } from '@playwright/test';

/**
 * Android Mobile Tests - Always Pass
 */
test.describe('Android Promise Operations @android', () => {

  test('Promise.resolve', async () => {
    const result = await Promise.resolve('success');
    expect(result).toBe('success');
  });

  test('Promise.all', async () => {
    const results = await Promise.all([
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3),
    ]);
    expect(results).toEqual([1, 2, 3]);
  });

  test('Promise with timeout', async () => {
    const result = await new Promise((resolve) => {
      setTimeout(() => resolve('done'), 50);
    });
    expect(result).toBe('done');
  });

  test('async/await chain', async () => {
    const step1 = async () => 'step1';
    const step2 = async (prev) => prev + '-step2';
    const step3 = async (prev) => prev + '-step3';

    const result = await step3(await step2(await step1()));
    expect(result).toBe('step1-step2-step3');
  });

});

test.describe('Android Map Operations @android', () => {

  test('Map set and get', async () => {
    const map = new Map();
    map.set('key1', 'value1');
    expect(map.get('key1')).toBe('value1');
  });

  test('Map size', async () => {
    const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
    expect(map.size).toBe(3);
  });

  test('Map has key', async () => {
    const map = new Map([['key', 'value']]);
    expect(map.has('key')).toBe(true);
    expect(map.has('missing')).toBe(false);
  });

  test('Map to array', async () => {
    const map = new Map([['a', 1], ['b', 2]]);
    expect(Array.from(map.keys())).toEqual(['a', 'b']);
    expect(Array.from(map.values())).toEqual([1, 2]);
  });

});

/**
 * iOS Mobile Tests - Always Pass
 */
test.describe('iOS Regular Expression Tests @ios', () => {

  test('regex test method', async () => {
    const pattern = /hello/;
    expect(pattern.test('hello world')).toBe(true);
    expect(pattern.test('goodbye')).toBe(false);
  });

  test('regex exec method', async () => {
    const pattern = /(\d+)/;
    const match = pattern.exec('abc123def');
    expect(match[1]).toBe('123');
  });

  test('string match', async () => {
    const str = 'test123test456';
    const matches = str.match(/\d+/g);
    expect(matches).toEqual(['123', '456']);
  });

  test('string replace', async () => {
    const str = 'hello world';
    const result = str.replace(/world/, 'universe');
    expect(result).toBe('hello universe');
  });

  test('global replace', async () => {
    const str = 'a-b-c-d';
    const result = str.replace(/-/g, '_');
    expect(result).toBe('a_b_c_d');
  });

});

test.describe('iOS Error Handling @ios', () => {

  test('try-catch success', async () => {
    let result;
    try {
      result = 'success';
    } catch (e) {
      result = 'error';
    }
    expect(result).toBe('success');
  });

  test('error instanceof', async () => {
    const error = new Error('test error');
    expect(error instanceof Error).toBe(true);
  });

  test('error message', async () => {
    const error = new Error('custom message');
    expect(error.message).toBe('custom message');
  });

  test('custom error', async () => {
    class CustomError extends Error {
      constructor(message) {
        super(message);
        this.name = 'CustomError';
      }
    }
    const error = new CustomError('test');
    expect(error.name).toBe('CustomError');
  });

  test('throws wrong error type', async () => {
    // Expects a TypeError but the code throws a RangeError
    expect(() => {
      throw new RangeError('out of range');
    }).toThrow(TypeError); // intentional failure
  });

});

test.describe('Android Iteration Operations @android', () => {

  test('for...of loop sum', async () => {
    let total = 0;
    for (const n of [1, 2, 3, 4, 5]) total += n;
    expect(total).toBe(15);
  });

  test('for...in loop keys', async () => {
    const obj = { a: 1, b: 2, c: 3 };
    const keys = [];
    for (const k in obj) keys.push(k);
    expect(keys).toEqual(['a', 'b', 'c']);
  });

  test('Array.from iterable', async () => {
    expect(Array.from('abc')).toEqual(['a', 'b', 'c']);
  });

  test('Array.of constructor', async () => {
    expect(Array.of(1, 2, 3)).toEqual([1, 2, 3]);
  });

});

test.describe('Android Flaky Behavior @android', () => {

  test('flaky async race', async () => {
    const winner = await Promise.race([
      new Promise((resolve) => setTimeout(() => resolve('A'), Math.random() * 50)),
      new Promise((resolve) => setTimeout(() => resolve('B'), Math.random() * 50)),
    ]);
    // Asserts that 'A' wins the race; sometimes 'B' arrives first
    expect(winner).toBe('A');
  });

  test('flaky setTimeout drift', async () => {
    const start = Date.now();
    await new Promise((resolve) => setTimeout(resolve, 25));
    const elapsed = Date.now() - start;
    // Strict upper bound on a 25ms timeout occasionally drifts over 40ms
    expect(elapsed).toBeLessThan(40);
  });

});

test.describe('iOS Flaky Behavior @ios', () => {

  test('flaky regex sampling', async () => {
    const samples = ['abc123', 'def456', 'ghi789', 'no-digits'];
    const picked = samples[Math.floor(Math.random() * samples.length)];
    // 75% of samples contain digits; 'no-digits' occasionally trips the assertion
    expect(picked).toMatch(/\d+/);
  });

  test('flaky probabilistic feature flag', async () => {
    const featureEnabled = Math.random() > 0.25;
    // Mimics a feature flag that should be enabled but flips ~25% of runs
    expect(featureEnabled).toBe(true);
  });

});

test.describe('iOS Map and Reduce @ios', () => {

  test('map transform strings', async () => {
    const result = ['a', 'b', 'c'].map((s) => s.toUpperCase());
    expect(result).toEqual(['A', 'B', 'C']);
  });

  test('reduce build object', async () => {
    const pairs = [['a', 1], ['b', 2], ['c', 3]];
    const obj = pairs.reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
    expect(obj).toEqual({ a: 1, b: 2, c: 3 });
  });

  test('reduce wrong initial value', async () => {
    const sum = [1, 2, 3].reduce((acc, n) => acc + n, 10);
    expect(sum).toBe(6); // intentional failure: initial is 10, total is 16
  });

  test('flatMap operation', async () => {
    const result = [[1, 2], [3, 4]].flatMap((x) => x);
    expect(result).toEqual([1, 2, 3, 4]);
  });

});
