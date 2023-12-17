import { generate } from 'generate-password';
import { passwordStrength } from 'check-password-strength';

/**
 * Password Service
 * Service in charge of managing the generation and strength analysis of Passwords.
 */
class PasswordService {
  /**
   * the list of characters that won't be included into passwords in order to avoid issues. e.g.
   * when using one of these values in a .env file.
   */
  static #EXCLUDE_CHARACTERS = '"\'={}`';

  // the aliases that describe the strength of a password
  static STRENGTH_ALIAS = ['Very Weak', 'Weak', 'Medium', 'Strong'];

  // the options that will be used to calculate the strength of a given password
  static #STRENGTH_OPTIONS = [
    {
      id: 0,
      value: PasswordService.STRENGTH_ALIAS[0],
      minDiversity: 0, // Default is 0
      minLength: 2, // Default is 0
    },
    {
      id: 1,
      value: PasswordService.STRENGTH_ALIAS[1],
      minDiversity: 0, // Default is 2
      minLength: 6, // Default is 6
    },
    {
      id: 2,
      value: PasswordService.STRENGTH_ALIAS[2],
      minDiversity: 4, // Default is 4
      minLength: 16, // Default is 8
    },
    {
      id: 3,
      value: PasswordService.STRENGTH_ALIAS[3],
      minDiversity: 4, // Default is 4
      minLength: 32, // Default is 10
    },
  ];





  /**
   * Generates a brand new "random" password based on the given configuration. Note that if the
   * strength of the password is Weak or less, it will throw an error.
   * @param {*} passwordLength
   * @param {*} includeNumbers
   * @param {*} includeLowerCase
   * @param {*} includeUpperCase
   * @param {*} includeSymbols
   * @param {?} minStrength
   * @returns string
   */
  static generate(
    passwordLength,
    includeNumbers,
    includeLowerCase,
    includeUpperCase,
    includeSymbols,
    minStrength = 1,
  ) {
    // generate the password
    const password = generate({
      length: passwordLength,
      numbers: includeNumbers,
      lowercase: includeLowerCase,
      uppercase: includeUpperCase,
      symbols: includeSymbols,
      exclude: this.#EXCLUDE_CHARACTERS,
      strict: true,
    });

    // ensure the password is not too weak
    const strength = PasswordService.calculateStrength(password);
    if (strength < minStrength) {
      throw new Error(`The generated password: ${password} is ${PasswordService.STRENGTH_ALIAS[strength]} and should not be used.`);
    }

    // finally, return it
    return password;
  }





  /**
   * Calculates the strength of a given password. Note that it will be an integer ranging from
   * 0 (Too Weak) to 3 (Strong).
   * @param {*} password
   * @returns number
   */
  static calculateStrength(password) {
    const result = passwordStrength(password, PasswordService.#STRENGTH_OPTIONS);
    return result && typeof result.id === 'number' ? result.id : 0;
  }
}




/**
 * Module Exports
 */
export default PasswordService;
