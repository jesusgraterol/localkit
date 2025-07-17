import { describe, test, afterAll, afterEach, beforeAll, beforeEach, expect } from '@jest/globals';
import {
  isSecretFormatValid,
  generateSecret,
  generateToken,
  isTokenFormatValid,
} from './otp.service.js';

/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('OTP Secret Management', () => {
  beforeAll(() => {});

  afterAll(() => {});

  beforeEach(() => {});

  afterEach(() => {});

  test('can validate the format of a secret', () => {
    expect(isSecretFormatValid('NB2RGV2KAY2CMACD')).toBe(true);
    expect(isSecretFormatValid('KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD')).toBe(true);
    expect(
      isSecretFormatValid('KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLDKVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD'),
    ).toBe(true);
    expect(
      isSecretFormatValid('KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLDKVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLDD'),
    ).toBe(false);
    expect(isSecretFormatValid('12345a')).toBe(false);
    expect(isSecretFormatValid()).toBe(false);
    expect(isSecretFormatValid(123456)).toBe(false);
    expect(isSecretFormatValid(undefined)).toBe(false);
    expect(isSecretFormatValid(null)).toBe(false);
    expect(isSecretFormatValid({})).toBe(false);
    expect(isSecretFormatValid([])).toBe(false);
  });

  test('can generate a valid secret', () => {
    expect(isSecretFormatValid(generateSecret())).toBe(true);
  });
});

describe('OTP Token Management', () => {
  beforeAll(() => {});

  afterAll(() => {});

  beforeEach(() => {});

  afterEach(() => {});

  test('can validate the format of a token', () => {
    expect(isTokenFormatValid('123456')).toBe(true);
    expect(isTokenFormatValid('12345a')).toBe(false);
    expect(isTokenFormatValid()).toBe(false);
    expect(isTokenFormatValid(123456)).toBe(false);
    expect(isTokenFormatValid('1234567')).toBe(false);
    expect(isTokenFormatValid('1234')).toBe(false);
    expect(isTokenFormatValid(undefined)).toBe(false);
    expect(isTokenFormatValid(null)).toBe(false);
    expect(isTokenFormatValid({})).toBe(false);
    expect(isTokenFormatValid([])).toBe(false);
  });

  test('can generate a valid token with a valid secret', () => {
    expect(isTokenFormatValid(generateToken('NB2RGV2KAY2CMACD'))).toBe(true);
  });
});
