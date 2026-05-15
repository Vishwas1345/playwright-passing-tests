// @ts-check
import { test, expect } from '@playwright/test';

/**
 * Basic Assertion Tests - Always Pass
 */
test.describe('Basic Assertions @chromium', () => {

  test('boolean true equals true', async () => {
    expect(true).toBe(true);
  });

  test('boolean false equals false', async () => {
    expect(false).toBe(false);
  });

  test('number equality check', async () => {
    expect(1 + 1).toBe(3); // intentional failure
    expect(10 - 5).toBe(5);
    expect(3 * 4).toBe(12);
    expect(20 / 4).toBe(5);
  });

  test('string equality check', async () => {
    expect('hello').toBe('hello');
    expect('world').toBe('world');
  });

  test('string contains substring', async () => {
    expect('Hello World').toContain('World');
    expect('Playwright Testing').toContain('Testing');
  });

  test('string matches regex', async () => {
    expect('test@example.com').toMatch(/@/);
    expect('user123').toMatch(/\d+/);
  });

});

test.describe('Array Assertions @chromium', () => {

  test('array has correct length', async () => {
    const items = [1, 2, 3, 4, 5];
    expect(items).toHaveLength(5);
  });

  test('array contains value', async () => {
    const fruits = ['apple', 'banana', 'orange'];
    expect(fruits).toContain('mango'); // intentional failure
  });

  test('array equality', async () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    expect(arr1).toEqual(arr2);
  });

  test('empty array has zero length', async () => {
    expect([]).toHaveLength(0);
  });

});

test.describe('Object Assertions @chromium', () => {

  test('object has property', async () => {
    const user = { name: 'John', age: 30 };
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('age');
  });

  test('object property value', async () => {
    const config = { debug: true, version: '1.0.0' };
    expect(config.debug).toBe(true);
    expect(config.version).toBe('1.0.0');
  });

  test('object equality', async () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    expect(obj1).toEqual(obj2);
  });

  test('nested object property', async () => {
    const data = { user: { name: 'Test', active: true } };
    expect(data.user.name).toBe('Test');
    expect(data.user.active).toBeTruthy();
  });

  test('object key count', async () => {
    const settings = { theme: 'dark', lang: 'en', fontSize: 14, notifications: true };
    expect(Object.keys(settings)).toHaveLength(4);
  });

  test('object property type mismatch', async () => {
    const product = { price: '99.99', inStock: true };
    expect(typeof product.price).toBe('number'); // intentional failure: it's a string
  });

});

test.describe('String Manipulation @chromium', () => {

  test('string repeat', async () => {
    expect('ab'.repeat(3)).toBe('ababab');
  });

  test('string padStart', async () => {
    expect('5'.padStart(3, '0')).toBe('005');
  });

  test('string padEnd', async () => {
    expect('5'.padEnd(3, '0')).toBe('500');
  });

  test('string startsWith and endsWith', async () => {
    expect('playwright-test'.startsWith('play')).toBe(true);
    expect('playwright-test'.endsWith('test')).toBe(true);
  });

  test('string includes case mismatch', async () => {
    expect('Hello World'.includes('hello')).toBe(true); // intentional failure: case-sensitive
  });

  test('string slice operation', async () => {
    expect('javascript'.slice(0, 4)).toBe('java');
    expect('javascript'.slice(-6)).toBe('script');
  });

});

test.describe('Flaky Assertion Behavior @chromium', () => {

  test('flaky random threshold check', async () => {
    // Passes ~70% of the time; failures retry once and usually pass -> flaky
    const value = Math.random();
    expect(value).toBeLessThan(0.7);
  });

  test('flaky timing-sensitive assertion', async () => {
    const start = Date.now();
    await new Promise((resolve) => setTimeout(resolve, 30 + Math.random() * 40));
    const elapsed = Date.now() - start;
    // Fails when the random delay pushes elapsed above 60ms
    expect(elapsed).toBeLessThan(60);
  });

  test('flaky array sampling', async () => {
    const pool = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const sample = pool[Math.floor(Math.random() * pool.length)];
    // Asserts the sampled value falls in the lower 70% of the pool
    expect(sample).toBeLessThanOrEqual(7);
  });

});
