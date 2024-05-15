import select from '@inquirer/select';
import { input } from '@inquirer/prompts';
import { print, delay, formatDate } from '../shared/utilities/utilities.js';
import { generateSecret, isSecretFormatValid, generateToken } from './otp.service.js';

/* ************************************************************************************************
 *                                        MODULE LAUNCHER                                         *
 ************************************************************************************************ */
export default async function launcher() {
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
    /* ********************************************************************************************
     *                                      GENERATE SECRET                                       *
     ******************************************************************************************** */
    case 'generate_secret': {
      print('OTPService.generateSecret', [
        'Generated OTP Secret:',
        generateSecret(),
      ], true);
      break;
    }





    /* ********************************************************************************************
     *                                       GENERATE TOKEN                                       *
     ******************************************************************************************** */
    case 'generate_token': {
      // retrieve the secret
      const secret = await input({
        message: 'Enter the OTP Secret',
        validate: ((v) => isSecretFormatValid(v)),
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
        const token = generateToken(secret);
        if (token !== prevToken) {
          generated += 1;
          console.log(`${generated}/${tokensTotal}) ${formatDate(undefined, 'hh:mm:ss a')}: ${token}`);
          // eslint-disable-next-line no-await-in-loop
          await delay(5);
        }
        prevToken = token;
      }
      break;
    }
    default:
      throw new Error('The selected action is invalid');
  }
}
