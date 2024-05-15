import { describe, test, afterAll, afterEach, beforeAll, beforeEach, expect } from '@jest/globals';
import { generatePassword, calculateStrength } from './password.service.js';

/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('Password Generator', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can generate passwords with any configuration', () => {
    expect(/^[0-9a-z]{10}$/.test(generatePassword(10, true, true, false, false))).toBe(true);
    expect(/^[0-9a-zA-Z]{20}$/.test(generatePassword(20, true, true, true, false))).toBe(true);
    expect(/^[a-zA-Z]{35}$/.test(generatePassword(35, false, true, true, false))).toBe(true);
    expect(/^[!@#$%^&*()+_\-=}{[\]|:;"/?.><,`~]{35}$/.test(generatePassword(35, false, false, false, true))).toBe(true);
    expect(/^.{100}$/.test(generatePassword(100, true, true, true, true))).toBe(true);
  });
});





describe('Password Strength Calculator', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can calculate the score of invalid passwords', () => {
    expect(calculateStrength()).toEqual(0);
    expect(calculateStrength(undefined)).toEqual(0);
    expect(calculateStrength(null)).toEqual(0);
    expect(calculateStrength(0)).toEqual(0);
    expect(calculateStrength(123456789123456)).toEqual(0);
    expect(calculateStrength(true)).toEqual(0);
    expect(calculateStrength(false)).toEqual(0);
    expect(calculateStrength({})).toEqual(0);
    expect(calculateStrength('123')).toEqual(0);
    expect(calculateStrength('    ')).toEqual(0);
  });

  test('can calculate the score of valid passwords', () => {
    expect(calculateStrength('aaaa1')).toEqual(0);
    expect(calculateStrength('Aaaaaaaaa1')).toEqual(1);
    expect(calculateStrength('$Aaaaaaaaaaaaaa1')).toEqual(2);
    expect(calculateStrength('$Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1')).toEqual(3);
  });
});
