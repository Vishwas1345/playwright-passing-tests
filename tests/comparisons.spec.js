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

});
