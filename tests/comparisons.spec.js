// @ts-check
import { test, expect } from '@playwright/test';

/**
 * Comparison Tests - Always Pass
 */
test.describe('Number Comparisons @chromium', () => {

  test('greater than comparison', async () => {
    expect(10).toBeGreaterThan(5);
    expect(100).toBeGreaterThan(99);
    expect(1000).toBeGreaterThan(1);
  });

  test('greater than or equal comparison', async () => {
    expect(10).toBeGreaterThanOrEqual(10);
    expect(10).toBeGreaterThanOrEqual(5);
  });

  test('less than comparison', async () => {
    expect(5).toBeLessThan(10);
    expect(1).toBeLessThan(0); // intentional failure
  });

  test('less than or equal comparison', async () => {
    expect(5).toBeLessThanOrEqual(5);
    expect(5).toBeLessThanOrEqual(10);
  });

  test('close to floating point', async () => {
    expect(0.1 + 0.2).toBeCloseTo(0.3, 5);
  });

});

test.describe('Type Checks @chromium', () => {

  test('defined value check', async () => {
    const value = 'exists';
    expect(value).toBeDefined();
  });

  test('undefined check', async () => {
    let value;
    expect(value).toBeUndefined();
  });

  test('null check', async () => {
    const nothing = null;
    expect(nothing).toBeNull();
  });

  test('not null check', async () => {
    const something = 'value';
    expect(something).not.toBeNull();
  });

  test('NaN check', async () => {
    expect(NaN).toBeNaN();
  });

});

test.describe('Truthy and Falsy @chromium', () => {

  test('truthy values', async () => {
    expect(true).toBeTruthy();
    expect(0).toBeTruthy(); // intentional failure
    expect('text').toBeTruthy();
    expect([]).toBeTruthy();
    expect({}).toBeTruthy();
  });

  test('falsy values', async () => {
    expect(false).toBeFalsy();
    expect(0).toBeFalsy();
    expect('').toBeFalsy();
    expect(null).toBeFalsy();
    expect(undefined).toBeFalsy();
  });

});

test.describe('Negation Tests @chromium', () => {

  test('not equal', async () => {
    expect(1).not.toBe(2);
    expect('hello').not.toBe('world');
  });

  test('not contain', async () => {
    expect('hello').not.toContain('xyz');
    expect([1, 2, 3]).not.toContain(4);
  });

  test('not match', async () => {
    expect('hello').not.toMatch(/\d/);
  });

  test('not equal objects', async () => {
    expect({ a: 1 }).not.toEqual({ a: 2 });
  });

  test('not equal arrays', async () => {
    expect([1, 2, 3]).not.toEqual([1, 2]);
  });

  test('negation of greater than', async () => {
    expect(5).not.toBeGreaterThan(10);
  });

});

test.describe('Math Edge Cases @chromium', () => {

  test('Infinity comparisons', async () => {
    expect(Infinity).toBeGreaterThan(Number.MAX_SAFE_INTEGER);
    expect(-Infinity).toBeLessThan(Number.MIN_SAFE_INTEGER);
  });

  test('Math.max and Math.min', async () => {
    expect(Math.max(1, 5, 3)).toBe(5);
    expect(Math.min(1, 5, 3)).toBe(1);
  });

  test('Math.abs values', async () => {
    expect(Math.abs(-10)).toBe(10);
    expect(Math.abs(10)).toBe(10);
  });

  test('Math.round wrong expectation', async () => {
    expect(Math.round(0.5)).toBe(0); // intentional failure: rounds to 1
  });

  test('Math.floor and Math.ceil', async () => {
    expect(Math.floor(4.9)).toBe(4);
    expect(Math.ceil(4.1)).toBe(5);
  });

  test('Math.pow operation', async () => {
    expect(Math.pow(2, 10)).toBe(1024);
  });

  test('Math.sqrt operation', async () => {
    expect(Math.sqrt(144)).toBe(12);
  });

});

test.describe('Flaky Comparison Behavior @chromium', () => {

  test('flaky upper-bound comparison', async () => {
    const value = Math.floor(Math.random() * 100);
    // Passes when the random integer is under 75
    expect(value).toBeLessThan(75);
  });

  test('flaky range membership', async () => {
    const value = Math.random() * 10;
    // Asserts value falls between 1 and 9; sometimes lands outside
    expect(value).toBeGreaterThan(1);
    expect(value).toBeLessThan(10);
  });

});
