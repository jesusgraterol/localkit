import select from '@inquirer/select';
import { input } from '@inquirer/prompts';
import PasswordService from './password.service.js';
import Utilities from '../shared/utilities/utilities.js';

/**
 * Module Launcher
 */
export default async function moduleLauncher() {
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
    /**
     * Generate Password
     */
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
      const password = PasswordService.generate(
        Number(answers.passwordLength),
        answers.includeNumbers === 'yes',
        answers.includeLowerCase === 'yes',
        answers.includeUpperCase === 'yes',
        answers.includeSymbols === 'yes',
      );

      // output it
      Utilities.print('PasswordService.generate', [
        `${PasswordService.STRENGTH_ALIAS[PasswordService.calculateStrength(password)]} Password:`,
        password,
      ], true);
      break;
    }





    /**
     * Calculate Password Strength
     */
    case 'calculate_strength': {
      const password = await input({ message: 'Enter the password', validate: ((v) => v.length > 0) });
      Utilities.print('PasswordService.calculateStrength', [
        `${PasswordService.STRENGTH_ALIAS[PasswordService.calculateStrength(password)]} Password:`,
        password,
      ]);
      break;
    }
    default:
      throw new Error('The selected action is invalid');
  }
}
