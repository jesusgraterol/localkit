import { passwordStrength } from 'check-password-strength';

/**
 * Password Service
 * Service in charge of managing the generation and strength analysis of Passwords.
 */
class PasswordService {
  // the aliases that describe the strength of a password
  static STRENGTH_ALIAS = ['Too weak', 'Weak', 'Medium', 'Strong'];

  // the options that will be used to calculate the strength of a given password
  static #STRENGTH_OPTIONS = [
    {
      id: 0,
      value: PasswordService.STRENGTH_ALIAS[0],
      minDiversity: 0, // Default is 0
      minLength: 6, // Default is 0
    },
    {
      id: 1,
      value: PasswordService.STRENGTH_ALIAS[1],
      minDiversity: 3, // Default is 2
      minLength: 10, // Default is 6
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
      minLength: 22, // Default is 10
    },
  ];





  /**
   * ...
   * @returns string
   */
  static generate() {
    // generate the password
    const password = '123';

    // ensure the password is not too weak
    if (PasswordService.calculateStrength(password) <= 1) {
      throw new Error(`The generated password: ${password} is too weak and should not be used.`);
    }

    // finally, return it
    return password;
  }





  /**
   * Calculates the strength of a given password. Note that it will be an integer ranging from
   * 0 (Too Weak) to 3 (Strong).
   * @param {*} password
   * @returns @TODO
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
