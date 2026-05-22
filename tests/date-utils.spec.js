// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Date and Time Utilities @chromium', () => {

  test('Date.now returns a positive number', async () => {
    expect(Date.now()).toBeGreaterThan(0);
  });

  test('new Date is an instance of Date', async () => {
    expect(new Date()).toBeInstanceOf(Date);
  });

  test('ISO string from epoch is correct', async () => {
    expect(new Date(0).toISOString()).toBe('1970-01-01T00:00:00.000Z');
  });

  test('year extracted from a known date', async () => {
    const d = new Date('2024-06-15T12:00:00Z');
    expect(d.getUTCFullYear()).toBe(2024);
    expect(d.getUTCMonth()).toBe(5);
    expect(d.getUTCDate()).toBe(15);
  });

  test('milliseconds between two dates', async () => {
    const start = new Date('2024-01-01T00:00:00Z');
    const end = new Date('2024-01-02T00:00:00Z');
    expect(end.getTime() - start.getTime()).toBe(24 * 60 * 60 * 1000);
  });

  test('day of week for a known date', async () => {
    expect(new Date('2024-01-01T00:00:00Z').getUTCDay()).toBe(1);
  });

  test('leap year detection', async () => {
    const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
    expect(isLeap(2024)).toBe(true);
    expect(isLeap(2023)).toBe(false);
    expect(isLeap(2000)).toBe(true);
    expect(isLeap(1900)).toBe(false);
  });

  test('parse ISO string back to date', async () => {
    const iso = '2025-12-31T23:59:59.000Z';
    expect(new Date(iso).toISOString()).toBe(iso);
  });

  test('invalid date detection', async () => {
    expect(Number.isNaN(new Date('not-a-date').getTime())).toBe(true);
  });

});

test.describe('Array Helpers @chromium', () => {

  test('array length after push', async () => {
    const arr = [1, 2, 3];
    arr.push(4);
    expect(arr).toHaveLength(4);
  });

  test('array contains expected value', async () => {
    expect(['a', 'b', 'c']).toContain('b');
  });

  test('array sort is stable for primitives', async () => {
    expect([3, 1, 2].sort()).toEqual([1, 2, 3]);
  });

  test('array filter removes falsy values', async () => {
    expect([0, 1, '', 'x', null, 'y'].filter(Boolean)).toEqual([1, 'x', 'y']);
  });

  test('array reduce sums numbers', async () => {
    expect([1, 2, 3, 4].reduce((a, b) => a + b, 0)).toBe(10);
  });

});
