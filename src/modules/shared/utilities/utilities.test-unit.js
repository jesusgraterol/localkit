import { describe, test, afterAll, afterEach, beforeAll, beforeEach, expect } from '@jest/globals';
import { generateBuildID, prettifyImageDimensions, formatDate } from './utilities.js';

/* ************************************************************************************************
 *                                           CONSTANTS                                            *
 ************************************************************************************************ */

// RegEx to validate formatted dates
const dateRegEx = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4},\s[0-9]{2}:[0-9]{2}:[0-9]{2}\s(AM|PM)/;

/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('Build Helpers', () => {
  beforeAll(() => {});

  afterAll(() => {});

  beforeEach(() => {});

  afterEach(() => {});

  test('can generate an identifier for a build', () => {
    expect(generateBuildID('favicon')).toMatch(/^favicon-build-[0-9]+$/);
    expect(generateBuildID('pwa-assets')).toMatch(/^pwa-assets-build-[0-9]+$/);
  });

  test('can prettify the dimensions of an image', () => {
    expect(prettifyImageDimensions({ width: 128, height: 128 })).toBe('128x128');
    expect(prettifyImageDimensions({ width: 512, height: 512 })).toBe('512x512');
    expect(prettifyImageDimensions({ width: 1920, height: 1080 })).toBe('1920x1080');
  });
});

describe('Date Formatting', () => {
  beforeAll(() => {});

  afterAll(() => {});

  beforeEach(() => {});

  afterEach(() => {});

  test('can properly format the current time', () => {
    const date = formatDate();
    expect(typeof date).toBe('string');
    expect(date.length).toBe(23);
    expect(dateRegEx.test(date)).toBe(true);
  });

  test('can properly format the current time (passing the current timestamp)', () => {
    const date = formatDate(Date.now());
    expect(typeof date).toBe('string');
    expect(date.length).toBe(23);
    expect(dateRegEx.test(date)).toBe(true);
  });

  test('can properly format a time from the past', () => {
    expect(formatDate(1672622975000)).toEqual('01/01/2023, 09:29:35 PM');
    expect(formatDate(1672622975000, 'dd/MM/yyyy, hh:mm:ss a')).toEqual('01/01/2023, 09:29:35 PM');
    expect(formatDate(1672622975000, 'dd/MM/yyyy')).toEqual('01/01/2023');
    expect(formatDate(1672622975000, 'hh:mm:ss a')).toEqual('09:29:35 PM');
  });
});
