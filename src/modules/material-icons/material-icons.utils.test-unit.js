import { describe, test, afterAll, afterEach, beforeAll, beforeEach, expect } from '@jest/globals';
import { buildStyleSheet } from './material-icons.utils.js';

/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('buildStyleSheet', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can build a stylesheet for icons that are not filled', () => {
    const stylesheet = buildStyleSheet(false);
    expect(typeof stylesheet).toBe('string');
    expect(stylesheet.length).toBeGreaterThan(0);
    expect(stylesheet.includes('font-variation-settings')).toBe(false);
  });

  test('can build a stylesheet for icons that are filled', () => {
    const stylesheet = buildStyleSheet(true);
    expect(typeof stylesheet).toBe('string');
    expect(stylesheet.length).toBeGreaterThan(0);
    expect(stylesheet.includes('font-variation-settings')).toBe(true);
  });
});
