import OTPService from './otp.service.js';




describe('OTP Secret Management', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can validate the format of a secret', () => {
    expect(OTPService.isSecretFormatValid('NB2RGV2KAY2CMACD')).toBe(true);
    expect(OTPService.isSecretFormatValid('KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD')).toBe(true);
    expect(OTPService.isSecretFormatValid('KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLDKVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD')).toBe(true);
    expect(OTPService.isSecretFormatValid('KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLDKVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLDD')).toBe(false);
    expect(OTPService.isSecretFormatValid('12345a')).toBe(false);
    expect(OTPService.isSecretFormatValid()).toBe(false);
    expect(OTPService.isSecretFormatValid(123456)).toBe(false);
    expect(OTPService.isSecretFormatValid(undefined)).toBe(false);
    expect(OTPService.isSecretFormatValid(null)).toBe(false);
    expect(OTPService.isSecretFormatValid({})).toBe(false);
    expect(OTPService.isSecretFormatValid([])).toBe(false);
  });

  test('can generate a valid secret', () => {
    expect(OTPService.isSecretFormatValid(OTPService.generateSecret())).toBe(true);
  });
});





describe('OTP Token Management', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can validate the format of a token', () => {
    expect(OTPService.isTokenFormatValid('123456')).toBe(true);
    expect(OTPService.isTokenFormatValid('12345a')).toBe(false);
    expect(OTPService.isTokenFormatValid()).toBe(false);
    expect(OTPService.isTokenFormatValid(123456)).toBe(false);
    expect(OTPService.isTokenFormatValid('1234567')).toBe(false);
    expect(OTPService.isTokenFormatValid('1234')).toBe(false);
    expect(OTPService.isTokenFormatValid(undefined)).toBe(false);
    expect(OTPService.isTokenFormatValid(null)).toBe(false);
    expect(OTPService.isTokenFormatValid({})).toBe(false);
    expect(OTPService.isTokenFormatValid([])).toBe(false);
  });

  test('can generate a valid token with a valid secret', () => {
    expect(OTPService.isTokenFormatValid(OTPService.generateToken('NB2RGV2KAY2CMACD'))).toBe(true);
  });
});
