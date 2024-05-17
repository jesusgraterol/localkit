import select from '@inquirer/select';
import { print } from '../shared/utilities/utilities.js';
import {
  ICON_STYLES,
  OUT_DIR,
  ICONS_FILE_NAME,
  STYLESHEET_FILE_NAME,
  install,
} from './material-icons.service.js';

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
    `${OUT_DIR}/`,
    `  ${ICONS_FILE_NAME}`,
    `  ${STYLESHEET_FILE_NAME}`,
    'Review the Material Icons documentation (localkit/Material Icons) for further instructions',
  ], true);
}
