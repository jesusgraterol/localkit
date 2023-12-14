import PasswordService from './password.service.js';




describe('Strength Calculator', () => {
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
    expect(PasswordService.calculateStrength('         ')).toEqual(0);
  });

  test('can calculate the score of valid passwords', () => {
    expect(PasswordService.calculateStrength('aaaaa1')).toEqual(0);
    expect(PasswordService.calculateStrength('Aaaaaaaaa1')).toEqual(1);
    expect(PasswordService.calculateStrength('$Aaaaaaaaaaaaaa1')).toEqual(2);
    expect(PasswordService.calculateStrength('$Aaaaaaaaaaaaaaaaaaaa1')).toEqual(3);
  });
});
