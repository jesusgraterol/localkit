import select from '@inquirer/select';
import { input } from '@inquirer/prompts';
import AES256Service from './aes256.service.js';
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
        name: 'Encrypt',
        value: 'encrypt',
        description: 'Encrypt any kind of message with a password',
      },
      {
        name: 'Decrypt',
        value: 'decrypt',
        description: 'Decrypt a previously encrypted message with the password',
      },
    ],
  });

  // execute the apropriate action
  switch (answer) {
    /**
     * Encrypt
     */
    case 'encrypt': {
      // extract the input
      const answers = {
        message: await input({ message: 'Enter the message', validate: ((v) => v.length > 0) }),
        password: await input({ message: 'Enter the password', validate: ((v) => v.length > 0) }),
      };

      // encrypt the message
      const encryptedMessage = AES256Service.encrypt(answers.password, answers.message);

      // print the results
      Utilities.print('AES256Service.encrypt', [
        'Original Message:',
        answers.message,
        '\nPassword:',
        answers.password,
        '\nEncrypted Message:',
        encryptedMessage,
      ], true);
      break;
    }





    /**
     * Decrypt
     */
    case 'decrypt': {
      // extract the input
      const answers = {
        message: await input({ message: 'Enter the encrypted message', validate: ((v) => v.length > 0) }),
        password: await input({ message: 'Enter the password', validate: ((v) => v.length > 0) }),
      };

      // decrypt the message
      const decryptedMessage = AES256Service.decrypt(answers.password, answers.message);

      // print the results
      Utilities.print('AES256Service.decrypt', [
        'Encrypted Message:',
        answers.message,
        '\nPassword:',
        answers.password,
        '\nOriginal Message:',
        decryptedMessage,
      ], true);
      break;
    }
    default:
      throw new Error('The selected action is invalid');
  }
}
