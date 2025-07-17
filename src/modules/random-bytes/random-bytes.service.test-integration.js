import { describe, test, afterAll, afterEach, beforeAll, beforeEach, expect } from '@jest/globals';
import { generate, validate } from './random-bytes.service.js';

/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('Random Bytes Management', () => {
  beforeAll(() => {});

  afterAll(() => {});

  beforeEach(() => {});

  afterEach(() => {});

  test('can generate a sequence of random bytes encoded with the Base64URL scheme', () => {
    const secret = generate(256);
    expect(typeof secret).toBe('string');
    expect(secret.length).toBeGreaterThan(256);
  });

  test('can generate and validate secrets', () => {
    [
      generate(6),
      generate(15),
      generate(24),
      generate(36),
      generate(48),
      generate(61),
      generate(75),
      generate(87),
      generate(98),
      generate(105),
      generate(115),
      generate(139),
      generate(185),
      generate(289),
      generate(336),
      generate(412),
      generate(512),
      generate(1024),
    ].forEach((secret) => {
      expect(validate(secret)).toBe(true);
    });
  });
});
