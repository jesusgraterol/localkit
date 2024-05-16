import { describe, test, afterAll, afterEach, beforeAll, beforeEach, expect } from '@jest/globals';
import { hash, validate } from './md5.service.js';

/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('MD5 Management', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can hash a given message (1)', () => {
    const h = hash('Hello world! this is a hashed message');
    expect(typeof h).toBe('string');
    expect(h.length).toBe(32);
    expect(validate(h)).toBe(true);
  });

  test('can hash a given message (2)', () => {
    const h = hash('Hello world! this is a hashed message. However, this is going to be a longer text. Much longer just to make sure. This is gonna be a little bit strange as there are spaces now.');
    expect(h).toBe('deb2a9bcea2fe472b92ad224a058fdc1');
  });

  test('can identify invalid md5 hashes', () => {
    expect(validate()).toBe(false);
    expect(validate(123)).toBe(false);
    expect(validate(undefined)).toBe(false);
    expect(validate(null)).toBe(false);
    expect(validate('')).toBe(false);
    expect(validate({})).toBe(false);
    expect(validate('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')).toBe(false);
    expect(validate('somethingelse')).toBe(false);
    expect(validate('aa140f7f60a54e7b92ce9352d516f5fde3f3bf7e')).toBe(false);
    expect(validate('630d0dcad5a84e5d62e2721fd213c14')).toBe(false);
    expect(validate('630d0dcad5a84e5d62e2721fd213c1434')).toBe(false);
  });
});
