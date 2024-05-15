import { generate } from 'generate-password';
import { passwordStrength } from 'check-password-strength';

/* ************************************************************************************************
 *                                           CONSTANTS                                            *
 ************************************************************************************************ */

// the list of characters that won't be included into passwords in order to avoid issues. e.g.
// when using one of these values in a .env file.
const __EXCLUDE_CHARACTERS = '"\'={}`';

// the aliases that describe the strength of a password
const STRENGTH_ALIAS = ['Very Weak', 'Weak', 'Medium', 'Strong'];

// the options that will be used to calculate the strength of a given password
const __STRENGTH_OPTIONS = [
  {
    id: 0,
    value: STRENGTH_ALIAS[0],
    minDiversity: 0, // Default is 0
    minLength: 2, // Default is 0
  },
  {
    id: 1,
    value: STRENGTH_ALIAS[1],
    minDiversity: 0, // Default is 2
    minLength: 6, // Default is 6
  },
  {
    id: 2,
    value: STRENGTH_ALIAS[2],
    minDiversity: 4, // Default is 4
    minLength: 16, // Default is 8
  },
  {
    id: 3,
    value: STRENGTH_ALIAS[3],
    minDiversity: 4, // Default is 4
    minLength: 32, // Default is 10
  },
];





/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Calculates the strength of a given password. Note that it will be an integer ranging from
 * 0 (Too Weak) to 3 (Strong).
 * @param {*} password
 * @returns number
 */
const calculateStrength = (password) => {
  const result = passwordStrength(password, __STRENGTH_OPTIONS);
  return result && typeof result.id === 'number' ? result.id : 0;
};

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
const generatePassword = (
  passwordLength,
  includeNumbers,
  includeLowerCase,
  includeUpperCase,
  includeSymbols,
  minStrength = 1,
) => {
  // generate the password
  const password = generate({
    length: passwordLength,
    numbers: includeNumbers,
    lowercase: includeLowerCase,
    uppercase: includeUpperCase,
    symbols: includeSymbols,
    exclude: __EXCLUDE_CHARACTERS,
    strict: true,
  });

  // ensure the password is not too weak
  const strength = calculateStrength(password);
  if (strength < minStrength) {
    throw new Error(`The generated password: ${password} is ${STRENGTH_ALIAS[strength]} and should not be used.`);
  }

  // finally, return it
  return password;
};




/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // constants
  STRENGTH_ALIAS,

  // actions
  calculateStrength,
  generatePassword,
};
