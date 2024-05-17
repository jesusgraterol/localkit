import { describe, test, afterAll, afterEach, beforeAll, beforeEach, expect } from '@jest/globals';
import { buildStyleSheet, buildPath } from './material-icons.utils.js';

/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('buildStyleSheet', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can build a stylesheet for icons that are not filled', () => {
    const stylesheet = buildStyleSheet('icons.woff2', false);
    expect(typeof stylesheet).toBe('string');
    expect(stylesheet.length).toBeGreaterThan(0);
    expect(stylesheet).not.toContain('font-variation-settings');
  });

  test('can build a stylesheet for icons that are filled', () => {
    const stylesheet = buildStyleSheet('icons.woff2', true);
    expect(typeof stylesheet).toBe('string');
    expect(stylesheet.length).toBeGreaterThan(0);
    expect(stylesheet).toContain('font-variation-settings');
  });
});





describe('buildPath', () => {
  test('can build a path for a file', () => {
    expect(buildPath('material-icons', 'icons.woff2')).toBe('material-icons/icons.woff2');
    expect(buildPath('material-icons', 'index.css')).toBe('material-icons/index.css');
  });
});
