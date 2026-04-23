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

});
