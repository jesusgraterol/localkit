import { describe, test, afterAll, afterEach, beforeAll, beforeEach, expect } from '@jest/globals';
import PWAAssetsBuilderValidations from './pwa-assets-builder.validations.js';

describe('General Validations', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can identify valid colors in hexadecimal formats', () => {
    expect(PWAAssetsBuilderValidations.isHexadecimalColorValid('#000000')).toBe(true);
    expect(PWAAssetsBuilderValidations.isHexadecimalColorValid('#FFFFFF')).toBe(true);
    expect(PWAAssetsBuilderValidations.isHexadecimalColorValid('#ffffff')).toBe(true);
    expect(PWAAssetsBuilderValidations.isHexadecimalColorValid('#990000')).toBe(true);
    expect(PWAAssetsBuilderValidations.isHexadecimalColorValid('#feeef7')).toBe(true);
  });

  test('can identify invalid colors in hexadecimal formats', () => {
    expect(PWAAssetsBuilderValidations.isHexadecimalColorValid('#00000')).toBe(false);
    expect(PWAAssetsBuilderValidations.isHexadecimalColorValid('000000')).toBe(false);
    expect(PWAAssetsBuilderValidations.isHexadecimalColorValid('#0000000')).toBe(false);
    expect(PWAAssetsBuilderValidations.isHexadecimalColorValid('#00000%')).toBe(false);
    expect(PWAAssetsBuilderValidations.isHexadecimalColorValid('#ass9/*')).toBe(false);
  });
});
