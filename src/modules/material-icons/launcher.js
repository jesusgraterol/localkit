import select from '@inquirer/select';
import { input } from '@inquirer/prompts';
import { print, delay, formatDate } from '../shared/utilities/utilities.js';
import { ICON_STYLES, install } from './material-icons.service.js';

/* ************************************************************************************************
 *                                        MODULE LAUNCHER                                         *
 ************************************************************************************************ */
export default async function launcher() {
  // read the user input
  const answers = {
    styleName: await select({
      message: 'Select icon\'s style',
      choices: ICON_STYLES.map((style) => style.name),
      loop: false,
    }),
    filled: await select({
      message: 'Filled?',
      choices: ['Yes', 'No'],
    }),
  };

  // install the icons
  await install(answers.styleName, answers.filled);
  print('MaterialIconsService.install', [
    `${STRENGTH_ALIAS[calculateStrength(password)]} Password:`,
    password,
  ], true);
}
