import { describe, test, afterAll, afterEach, beforeAll, beforeEach, expect } from '@jest/globals';
import Utilities from './utilities.js';

// RegEx to validate formatted dates
const dateRegEx = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4},\s[0-9]{2}:[0-9]{2}:[0-9]{2}\s(AM|PM)/;



describe('Build Helpers', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can generate an identifier for a build', () => {
    expect(Utilities.generateBuildID('favicon')).toMatch(/^favicon-build-[0-9]+$/);
    expect(Utilities.generateBuildID('pwa-assets')).toMatch(/^pwa-assets-build-[0-9]+$/);
  });

  test('can prettify the dimensions of an image', () => {
    expect(Utilities.prettifyImageDimensions({ width: 128, height: 128 })).toBe('128x128');
    expect(Utilities.prettifyImageDimensions({ width: 512, height: 512 })).toBe('512x512');
    expect(Utilities.prettifyImageDimensions({ width: 1920, height: 1080 })).toBe('1920x1080');
  });
});





describe('Date Formatting', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can properly format the current time', () => {
    const date = Utilities.formatDate();
    expect(typeof date).toBe('string');
    expect(date.length).toBe(23);
    expect(dateRegEx.test(date)).toBe(true);
  });

  test('can properly format the current time (passing the current timestamp)', () => {
    const date = Utilities.formatDate(Date.now());
    expect(typeof date).toBe('string');
    expect(date.length).toBe(23);
    expect(dateRegEx.test(date)).toBe(true);
  });

  test('can properly format a time from the past', () => {
    expect(Utilities.formatDate(1672622975000)).toEqual('01/01/2023, 09:29:35 PM');
    expect(
      Utilities.formatDate(1672622975000, 'dd/MM/yyyy, hh:mm:ss a'),
    ).toEqual('01/01/2023, 09:29:35 PM');
    expect(Utilities.formatDate(1672622975000, 'dd/MM/yyyy')).toEqual('01/01/2023');
    expect(Utilities.formatDate(1672622975000, 'hh:mm:ss a')).toEqual('09:29:35 PM');
  });
});
