// @ts-check
import { test, expect } from '@playwright/test';

test.describe('String Utilities @chromium', () => {

  test('toUpperCase converts string', async () => {
    expect('hello'.toUpperCase()).toBe('HELLO');
  });

  test('toLowerCase converts string', async () => {
    expect('WORLD'.toLowerCase()).toBe('world');
  });

  test('trim removes whitespace', async () => {
    expect('  spaced  '.trim()).toBe('spaced');
  });

  test('split on delimiter', async () => {
    expect('a,b,c'.split(',')).toEqual(['a', 'b', 'c']);
  });

  test('join array back to string', async () => {
    expect(['x', 'y', 'z'].join('-')).toBe('x-y-z');
  });

  test('replace substring', async () => {
    expect('foo bar foo'.replace('foo', 'baz')).toBe('baz bar foo');
  });

  test('replaceAll substring', async () => {
    expect('foo bar foo'.replaceAll('foo', 'baz')).toBe('baz bar baz');
  });

  test('startsWith and endsWith', async () => {
    expect('playwright'.startsWith('play')).toBe(true);
    expect('playwright'.endsWith('wright')).toBe(true);
  });

  test('repeat string n times', async () => {
    expect('ab'.repeat(3)).toBe('ababab');
  });

  test('padStart and padEnd', async () => {
    expect('5'.padStart(3, '0')).toBe('005');
    expect('5'.padEnd(3, '0')).toBe('500');
  });

  test('template literal interpolation', async () => {
    const name = 'world';
    expect(`hello ${name}`).toBe('hello world');
  });

  test('reverse a string', async () => {
    expect('abc'.split('').reverse().join('')).toBe('cba');
  });

});

test.describe('Math Operations @chromium', () => {

  test('Math.max returns largest', async () => {
    expect(Math.max(1, 5, 3)).toBe(5);
  });

  test('Math.min returns smallest', async () => {
    expect(Math.min(1, 5, 3)).toBe(1);
  });

  test('Math.abs returns absolute value', async () => {
    expect(Math.abs(-42)).toBe(42);
  });

  test('Math.floor rounds down', async () => {
    expect(Math.floor(3.9)).toBe(3);
  });

  test('Math.ceil rounds up', async () => {
    expect(Math.ceil(3.1)).toBe(4);
  });

  test('Math.round rounds to nearest', async () => {
    expect(Math.round(3.5)).toBe(4);
    expect(Math.round(3.4)).toBe(3);
  });

  test('Math.pow exponentiation', async () => {
    expect(Math.pow(2, 10)).toBe(1024);
  });

  test('Math.sqrt square root', async () => {
    expect(Math.sqrt(144)).toBe(12);
  });

  test('Number.isInteger detects integers', async () => {
    expect(Number.isInteger(5)).toBe(true);
    expect(Number.isInteger(5.5)).toBe(false);
  });

  test('parseFloat parses decimals', async () => {
    expect(parseFloat('3.14')).toBe(3.14);
  });

});
