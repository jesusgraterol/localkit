import select from '@inquirer/select';
import { input } from '@inquirer/prompts';
import MD5Service from './md5.service.js';
import Utilities from '../utilities/utilities.js';

/**
 * Module Launcher
 */
export default async function moduleLauncher() {
  // read the user input
  const answer = await select({
    message: 'Select an action',
    choices: [
      {
        name: 'Hash',
        value: 'hash',
        description: 'Hash any message using the md5 algorithm',
        disabled: '',
      },
      {
        name: 'Validate',
        value: 'validate',
        description: 'Check if a string is a valid md5 hash',
        disabled: '',
      },
    ],
  });

  // execute the apropriate action
  switch (answer) {
    case 'hash': {
      const message = await input({
        message: 'Enter the message you wish to hash',
        validate: ((v) => v.length > 0),
      });
      Utilities.print('MD5Service.hash', [
        'Original:',
        message,
        '\n\nmd5 Hash:',
        MD5Service.hash(message),
      ], true);
      break;
    }
    case 'validate': {
      const hash = await input({ message: 'Enter the md5 hash', validate: ((v) => v.length > 0) });
      Utilities.print('MD5Service.validate', [
        hash,
        `Is ${MD5Service.validate(hash) ? 'a VALID' : 'an INVALID'} md5 hash`,
      ]);
      break;
    }
    default:
      throw new Error('The selected action is invalid');
  }
}
