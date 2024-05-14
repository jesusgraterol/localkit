import select from '@inquirer/select';
import { input } from '@inquirer/prompts';
import { generate, validate } from './uuid.service.js';
import { print } from '../shared/utilities/utilities.js';

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
        description: 'Generate a universally unique identifier v4',
      },
      {
        name: 'Validate',
        value: 'validate',
        description: 'Validate a universally unique identifier v4',
      },
    ],
    loop: false,
  });

  // execute the apropriate action
  switch (answer) {
    case 'generate':
      print('UUIDService.generate', [
        'Generated UUID:',
        generate(),
      ], true);
      break;
    case 'validate': {
      const uuid = await input({ message: 'Enter the uuid v4', validate: ((v) => v.length > 0) });
      print('UUIDService.validate', [
        `${validate(uuid) ? 'VALID' : 'INVALID'} UUID:`,
        uuid,
      ]);
      break;
    }
    default:
      throw new Error('The selected action is invalid');
  }
}
