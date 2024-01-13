import select from '@inquirer/select';
import Utilities from '../shared/utilities/utilities.js';
import FileSystemService from '../shared/file-system/file-system.service.js';
import FaviconBuilderService from './favicon-builder.service.js';

/**
 * Module Launcher
 */
export default async function moduleLauncher() {
  // read the contents of the current working directory
  const { files } = await FileSystemService.readPathContent('./', ['.png']);
  if (!files.length) {
    throw new Error('The Favicon Builder requires a .png image as the source file.');
  }

  // select the source file path
  const sourceFilePath = await select({
    message: 'Select the source file (512x512 .png image)',
    choices: files.map((file) => ({ name: file.baseName, value: file.path })),
    loop: false,
  });

  // execute the build
  const buildID = await FaviconBuilderService.build(sourceFilePath);

  // print the result of the build
  Utilities.print('FaviconBuilderService.build', [
    'Input:',
    sourceFilePath,
    '\n\nOutput:',
    buildID,
  ], true);
}
