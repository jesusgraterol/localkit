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
    loop: false,
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
      // retrieve the secret
      const secret = await input({
        message: 'Enter the OTP Secret',
        validate: ((v) => OTPService.isSecretFormatValid(v)),
      });

      // retrieve the duration of the token generator
      const tokensTotal = await select({
        message: 'Select the duration of the Token Generator Instance',
        choices: [
          { name: '5 minutes', value: 10 }, { name: '30 minutes', value: 60 },
          { name: '1 hour', value: 120 }, { name: '2 hours', value: 240 },
          { name: '6 hours', value: 720 }, { name: '12 hours', value: 1440 },
        ],
        loop: false,
      });

      // generate tokens until the requirement has been met
      let prevToken;
      let generated = 0;
      while (generated < tokensTotal) {
        const token = OTPService.generateToken(secret);
        if (token !== prevToken) {
          generated += 1;
          console.log(`${generated}/${tokensTotal}) ${Utilities.formatDate(undefined, 'hh:mm:ss a')}: ${token}`);
          // eslint-disable-next-line no-await-in-loop
          await Utilities.delay(5);
        }
        prevToken = token;
      }
      break;
    }
    default:
      throw new Error('The selected action is invalid');
  }
}
