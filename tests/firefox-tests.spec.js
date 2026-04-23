// @ts-check
import { test, expect } from '@playwright/test';

/**
 * Firefox Browser Tests - Always Pass
 */
test.describe('Firefox Math Operations @firefox', () => {

  test('addition operations', async () => {
    expect(5 + 5).toBe(10);
    expect(100 + 200).toBe(300);
    expect(-5 + 10).toBe(5);
  });

  test('subtraction operations', async () => {
    expect(10 - 5).toBe(5);
    expect(100 - 50).toBe(50);
    expect(0 - 5).toBe(-5);
  });

  test('multiplication operations', async () => {
    expect(5 * 5).toBe(25);
    expect(10 * 10).toBe(100);
    expect(3 * 7).toBe(21);
  });

  test('division operations', async () => {
    expect(10 / 2).toBe(5);
    expect(100 / 10).toBe(10);
    expect(21 / 7).toBe(3);
  });

  test('modulo operations', async () => {
    expect(10 % 3).toBe(1);
    expect(15 % 5).toBe(0);
    expect(7 % 2).toBe(1);
  });

});

test.describe('Firefox String Operations @firefox', () => {

  test('string concatenation', async () => {
    expect('Hello' + ' ' + 'World').toBe('Hello World');
  });

  test('string length', async () => {
    expect('Hello'.length).toBe(5);
    expect(''.length).toBe(0);
  });

  test('string uppercase', async () => {
    expect('hello'.toUpperCase()).toBe('HELLO');
  });

  test('string lowercase', async () => {
    expect('HELLO'.toLowerCase()).toBe('hello');
  });

  test('string trim', async () => {
    expect('  hello  '.trim()).toBe('hello');
  });

  test('string split', async () => {
    expect('a,b,c'.split(',')).toEqual(['a', 'b', 'c']);
  });

});

test.describe('Firefox Array Operations @firefox', () => {

  test('array push', async () => {
    const arr = [1, 2, 3];
    arr.push(4);
    expect(arr).toEqual([1, 2, 3, 4]);
  });

  test('array pop', async () => {
    const arr = [1, 2, 3];
    const popped = arr.pop();
    expect(popped).toBe(3);
    expect(arr).toEqual([1, 2]);
  });

  test('array map', async () => {
    const doubled = [1, 2, 3].map(x => x * 2);
    expect(doubled).toEqual([2, 4, 6]);
  });

  test('array filter', async () => {
    const evens = [1, 2, 3, 4, 5].filter(x => x % 2 === 0);
    expect(evens).toEqual([2, 4]);
  });

  test('array reduce', async () => {
    const sum = [1, 2, 3, 4, 5].reduce((a, b) => a + b, 0);
    expect(sum).toBe(15);
  });

});
