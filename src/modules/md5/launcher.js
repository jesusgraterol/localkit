import select from '@inquirer/select';
import { input } from '@inquirer/prompts';
import { print } from '../shared/utilities/utilities.js';
import { hash, validate } from './md5.service.js';

/* ************************************************************************************************
 *                                        MODULE LAUNCHER                                         *
 ************************************************************************************************ */
export default async function launcher() {
  // read the user input
  const answer = await select({
    message: 'Select an action',
    choices: [
      {
        name: 'Hash',
        value: 'hash',
        description: 'Hash any message using the md5 algorithm',
      },
      {
        name: 'Validate',
        value: 'validate',
        description: 'Check if a string is a valid md5 hash',
      },
    ],
    loop: false,
  });

  // execute the apropriate action
  switch (answer) {
    case 'hash': {
      const message = await input({
        message: 'Enter the message you wish to hash',
        validate: ((v) => v.length > 0),
      });
      print('MD5Service.hash', [
        'Original:',
        message,
        '\n\nmd5 Hash:',
        hash(message),
      ], true);
      break;
    }
    case 'validate': {
      const h = await input({ message: 'Enter the md5 hash', validate: ((v) => v.length > 0) });
      print('MD5Service.validate', [
        hash,
        `Is ${validate(h) ? 'a VALID' : 'an INVALID'} md5 hash`,
      ]);
      break;
    }
    default:
      throw new Error('The selected action is invalid');
  }
}
