import { describe, test, afterAll, afterEach, beforeAll, beforeEach, expect } from '@jest/globals';
import UUIDService from './uuid.service.js';




describe('UUID Management', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can generate a valid id', () => {
    const uuid = UUIDService.generate();
    expect(typeof uuid).toBe('string');
    expect(uuid.length).toBe(36);
    expect(UUIDService.validate(uuid)).toBe(true);
    expect(
      /^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$/.test(uuid),
    ).toBe(true);
  });

  test('can identify invalid uuids', () => {
    expect(UUIDService.validate()).toBe(false);
    expect(UUIDService.validate(123)).toBe(false);
    expect(UUIDService.validate(undefined)).toBe(false);
    expect(UUIDService.validate(null)).toBe(false);
    expect(UUIDService.validate('')).toBe(false);
    expect(UUIDService.validate({})).toBe(false);
    expect(UUIDService.validate('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')).toBe(true);
    expect(UUIDService.validate('9b1deb4d-3b7d4bad-9bdd-2b0d7b3dcb6d')).toBe(false);
    expect(UUIDService.validate('somethingelse')).toBe(false);
    expect(UUIDService.validate('9b1deb4d-3%7d-4bad-9bdd-2b0d7b3d-b6d')).toBe(false);
    expect(UUIDService.validate('d9428888-122b-11e1-b85c-61cd3cbb3210')).toBe(false);
    expect(UUIDService.validate('c106a26a-21bb-5538-8bf2-57095d1976c1')).toBe(false);
    expect(UUIDService.validate('630eb68f-e0fa-5ecc-887a-7c7a62614681')).toBe(false);
  });
});
