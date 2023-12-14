import select from '@inquirer/select';
import { input } from '@inquirer/prompts';
import UUIDService from './uuid.service.js';
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
        description: 'Generate a universally unique identifier v4',
        disabled: '',
      },
      {
        name: 'Validate',
        value: 'validate',
        description: 'Validate a universally unique identifier v4',
        disabled: '',
      },
    ],
  });

  // execute the apropriate action
  switch (answer) {
    case 'generate':
      Utilities.print('UUIDService.generate', [
        'Generated ID:',
        UUIDService.generate(),
      ], true);
      break;
    case 'validate': {
      const uuid = await input({ message: 'Enter the uuid v4', validate: ((v) => v.length > 0) });
      Utilities.print('UUIDService.validate', [
        `${UUIDService.validate(uuid) ? 'VALID' : 'INVALID'} uuid v4:`,
        uuid,
      ]);
      break;
    }
    default:
      throw new Error('The selected action is invalid');
  }
}
