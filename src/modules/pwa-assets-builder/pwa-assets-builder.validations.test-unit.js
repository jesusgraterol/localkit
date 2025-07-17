import { describe, test, afterAll, afterEach, beforeAll, beforeEach, expect } from '@jest/globals';
import { isHexadecimalColorValid } from './pwa-assets-builder.validations.js';

/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('General Validations', () => {
  beforeAll(() => {});

  afterAll(() => {});

  beforeEach(() => {});

  afterEach(() => {});

  test('can identify valid colors in hexadecimal formats', () => {
    expect(isHexadecimalColorValid('#000000')).toBe(true);
    expect(isHexadecimalColorValid('#FFFFFF')).toBe(true);
    expect(isHexadecimalColorValid('#ffffff')).toBe(true);
    expect(isHexadecimalColorValid('#990000')).toBe(true);
    expect(isHexadecimalColorValid('#feeef7')).toBe(true);
  });

  test('can identify invalid colors in hexadecimal formats', () => {
    expect(isHexadecimalColorValid('#00000')).toBe(false);
    expect(isHexadecimalColorValid('000000')).toBe(false);
    expect(isHexadecimalColorValid('#0000000')).toBe(false);
    expect(isHexadecimalColorValid('#00000%')).toBe(false);
    expect(isHexadecimalColorValid('#ass9/*')).toBe(false);
  });
});
