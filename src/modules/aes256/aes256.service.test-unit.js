import { describe, test, afterAll, afterEach, beforeAll, beforeEach, expect } from '@jest/globals';
import { encrypt, decrypt } from './aes256.service.js';
import { LONG_MESSAGE } from './test-data.js';

/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('AES256 Management', () => {
  beforeAll(() => {});

  afterAll(() => {});

  beforeEach(() => {});

  afterEach(() => {});

  test('can encrypt a message and decrypt it afterwards with the correct password', () => {
    const rawMessage = 'This is the message that will be encrypted.';
    const password = 'ThisIsA123Password';
    const encryptedMessage = encrypt(password, rawMessage);
    const decryptedMessage = decrypt(password, encryptedMessage);
    expect(typeof encryptedMessage).toBe('string');
    expect(encryptedMessage.length).toBeGreaterThan(0);
    expect(decryptedMessage).toEqual(rawMessage);
  });

  test('cannot decrypt a message unless the right password is provided', () => {
    const rawMessage = 'This is the message that will be encrypted.';
    const password = '123456';
    const encryptedMessage = encrypt(password, rawMessage);
    expect(decrypt('12345', encryptedMessage)).not.toEqual(rawMessage);
    expect(decrypt(password, encryptedMessage)).toEqual(rawMessage);
  });

  test('can encrypt and decrypt a very large text with different characters and symbols', () => {
    const password =
      'k.EGYjMq4Edf/Q5C*ksMdX2/s/gNa%me%@*X_Vg(~CYP|x1Wjtd:T/C0dn3[JV.;pM:p$og[|N:oyAqjSXJyh;lNCe<A~7($XPMJXMc,f13ix1hzpim_)Rv$VB9e4(x1X!NN@Un-P^(WOd>?s!->x%f)TMdPvgwR-Yr<i9[7>i2UGJJ.BxMNO^w@aUtrlJf;JF~xY[4?';
    const encryptedMessage = encrypt(password, LONG_MESSAGE);
    expect(decrypt(password, encryptedMessage)).toEqual(LONG_MESSAGE);
  });
});
