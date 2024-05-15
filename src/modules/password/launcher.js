import select from '@inquirer/select';
import { input } from '@inquirer/prompts';
import { print } from '../shared/utilities/utilities.js';
import { STRENGTH_ALIAS, generatePassword, calculateStrength } from './password.service.js';

/* ************************************************************************************************
 *                                        MODULE LAUNCHER                                         *
 ************************************************************************************************ */
export default async function launcher() {
  // read the user input
  const answer = await select({
    message: 'Select an action',
    choices: [
      {
        name: 'Generate',
        value: 'generate',
        description: 'Generate a random password',
      },
      {
        name: 'Calculate Strength',
        value: 'calculate_strength',
        description: 'Calculate the strength of a password',
      },
    ],
    loop: false,
  });

  // execute the apropriate action
  switch (answer) {
    /* ********************************************************************************************
     *                                     GENERATE PASSWORD                                      *
     ******************************************************************************************** */
    case 'generate': {
      // extract the configuration
      const answers = {
        passwordLength: await input({
          message: 'Enter the desired length',
          default: '50',
          validate: ((v) => v.length > 0 && !Number.isNaN(v) && v >= 6 && v <= 10000),
        }),
        includeNumbers: await select({
          message: 'Include Numbers?',
          default: 'yes',
          choices: [{ name: 'Yes', value: 'yes' }, { name: 'No', value: 'no' }],
          loop: false,
        }),
        includeLowerCase: await select({
          message: 'Include LowerCase Letters?',
          default: 'yes',
          choices: [{ name: 'Yes', value: 'yes' }, { name: 'No', value: 'no' }],
          loop: false,
        }),
        includeUpperCase: await select({
          message: 'Include UpperCase Letters?',
          default: 'yes',
          choices: [{ name: 'Yes', value: 'yes' }, { name: 'No', value: 'no' }],
          loop: false,
        }),
        includeSymbols: await select({
          message: 'Include Symbols?',
          default: 'yes',
          choices: [{ name: 'Yes', value: 'yes' }, { name: 'No', value: 'no' }],
          loop: false,
        }),
      };

      // generate the password
      const password = generatePassword(
        Number(answers.passwordLength),
        answers.includeNumbers === 'yes',
        answers.includeLowerCase === 'yes',
        answers.includeUpperCase === 'yes',
        answers.includeSymbols === 'yes',
      );

      // output it
      print('PasswordService.generatePassword', [
        `${STRENGTH_ALIAS[calculateStrength(password)]} Password:`,
        password,
      ], true);
      break;
    }





    /* ********************************************************************************************
     *                                CALCULATE PASSWORD STRENGTH                                 *
     ******************************************************************************************** */
    case 'calculate_strength': {
      const password = await input({ message: 'Enter the password', validate: ((v) => v.length > 0) });
      print('PasswordService.calculateStrength', [
        `${STRENGTH_ALIAS[calculateStrength(password)]} Password:`,
        password,
      ]);
      break;
    }
    default:
      throw new Error('The selected action is invalid');
  }
}
