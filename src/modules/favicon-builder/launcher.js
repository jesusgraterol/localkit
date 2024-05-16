import select from '@inquirer/select';
import { print } from '../shared/utilities/utilities.js';
import { readPathContent } from '../shared/file-system/file-system.service.js';
import { build } from './favicon-builder.service.js';

/* ************************************************************************************************
 *                                        MODULE LAUNCHER                                         *
 ************************************************************************************************ */
export default async function launcher() {
  // read the contents of the current working directory
  const { files } = await readPathContent('./', ['.png']);
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
  const buildID = await build(sourceFilePath);

  // print the result of the build
  print('FaviconBuilderService.build', [
    'Input:',
    sourceFilePath,
    '\n\nOutput:',
    buildID,
  ], true);
}
