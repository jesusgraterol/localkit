import select from '@inquirer/select';
import { input } from '@inquirer/prompts';
import OTPService from './otp.service.js';
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
        name: 'Generate Secret',
        value: 'generate_secret',
        description: 'Generate a OTP Secret',
      },
      {
        name: 'Generate Token',
        value: 'generate_token',
        description: 'Generate a OTP Token',
      },
    ],
  });

  // execute the apropriate action
  switch (answer) {
    /**
     * Generate Secret
     */
    case 'generate_secret': {
      Utilities.print('OTPService.generateSecret', [
        'Generated OTP Secret:',
        OTPService.generateSecret(),
      ], true);
      break;
    }




    /**
     * Generate Token
     */
    case 'generate_token': {
      const secret = await input({
        message: 'Enter the OTP Secret',
        validate: ((v) => OTPService.isSecretFormatValid(v)),
      });
      let generateAnother = 'yes';
      while (generateAnother === 'yes') {
        Utilities.print('OTPService.generateToken', [
          'Active OTP Token:',
          OTPService.generateToken(secret),
        ]);
        // eslint-disable-next-line no-await-in-loop
        generateAnother = await select({
          message: 'Generate Another Token?',
          choices: [{ name: 'Yes', value: 'yes' }, { name: 'No', value: 'no' }],
        });
      }
      break;
    }
    default:
      throw new Error('The selected action is invalid');
  }
}
