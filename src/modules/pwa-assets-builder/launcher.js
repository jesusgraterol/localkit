import select from '@inquirer/select';
import { input } from '@inquirer/prompts';
import { print } from '../shared/utilities/utilities.js';
import { readPathContent } from '../shared/file-system/file-system.service.js';
import { isHexadecimalColorValid } from './pwa-assets-builder.validations.js';
import { build } from './pwa-assets-builder.service.js';

/**
 * Module Launcher
 */
export default async function moduleLauncher() {
  // read the contents of the current working directory
  const { files } = await readPathContent('./', ['.png']);
  if (!files.length) {
    throw new Error('The PWA Asset Builder requires the logo in .png format.');
  }

  // select the source file path
  const sourceFilePath = await select({
    message: 'Select the logo',
    choices: files.map((file) => ({ name: file.baseName, value: file.path })),
    loop: false,
  });

  // collect the background color (the project's primary color)
  const bgColor = await input({
    message: 'Enter the background color',
    validate: isHexadecimalColorValid,
  });

  // execute the build
  const buildID = await build(sourceFilePath, bgColor);

  // print the result of the build
  print('PWAAssetBuilderService.build', [
    'Input:',
    sourceFilePath,
    '\n\nOutput:',
    buildID,
  ], true);
}
