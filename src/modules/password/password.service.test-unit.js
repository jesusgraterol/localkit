import PasswordService from './password.service.js';




describe('Password Generator', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can generate passwords with any configuration', () => {
    expect(/^[0-9a-z]{10}$/.test(PasswordService.generate(10, true, true, false, false))).toBe(true);
    expect(/^[0-9a-zA-Z]{20}$/.test(PasswordService.generate(20, true, true, true, false))).toBe(true);
    expect(/^[a-zA-Z]{35}$/.test(PasswordService.generate(35, false, true, true, false))).toBe(true);
    expect(/^[!@#$%^&*()+_\-=}{[\]|:;"/?.><,`~]{35}$/.test(PasswordService.generate(35, false, false, false, true))).toBe(true);
    expect(/^.{100}$/.test(PasswordService.generate(100, true, true, true, true))).toBe(true);
  });
});





describe('Password Strength Calculator', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can calculate the score of invalid passwords', () => {
    expect(PasswordService.calculateStrength()).toEqual(0);
    expect(PasswordService.calculateStrength(undefined)).toEqual(0);
    expect(PasswordService.calculateStrength(null)).toEqual(0);
    expect(PasswordService.calculateStrength(0)).toEqual(0);
    expect(PasswordService.calculateStrength(123456789123456)).toEqual(0);
    expect(PasswordService.calculateStrength(true)).toEqual(0);
    expect(PasswordService.calculateStrength(false)).toEqual(0);
    expect(PasswordService.calculateStrength({})).toEqual(0);
    expect(PasswordService.calculateStrength('123')).toEqual(0);
    expect(PasswordService.calculateStrength('    ')).toEqual(0);
  });

  test('can calculate the score of valid passwords', () => {
    expect(PasswordService.calculateStrength('aaaa1')).toEqual(0);
    expect(PasswordService.calculateStrength('Aaaaaaaaa1')).toEqual(1);
    expect(PasswordService.calculateStrength('$Aaaaaaaaaaaaaa1')).toEqual(2);
    expect(PasswordService.calculateStrength('$Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1')).toEqual(3);
  });
});
