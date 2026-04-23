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

});
