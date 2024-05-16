import pngToIco from 'png-to-ico';
import { generateBuildID } from '../shared/utilities/utilities.js';
import {
  makeDirectory,
  copyFile,
  writeFile,
  deleteDirectory,
} from '../shared/file-system/file-system.service.js';
import { CONFIG } from './favicon-builder.config.js';
import {
  readSourcePath,
  getFaviconPathByDimensions,
  generateBuildReceipt,
} from './favicon-builder.utils.js';

/* ************************************************************************************************
 *                                          BUILD PROCESS                                         *
 ************************************************************************************************ */

/**
 * Performs the build action and outputs the result in a directory like favicon-build-${TIMESTAMP}
 * @param {*} sourcePath
 * @returns Promise<string>
 */
const build = async (sourcePath) => {
  // read the source path
  const sourceFile = await readSourcePath(
    sourcePath,
    CONFIG.outputDimensions.at(-1),
  );

  // initialize the identifier
  const id = generateBuildID('favicon');

  // create the build dir
  await makeDirectory(id);

  try {
    // create the variations directory
    await makeDirectory(`${id}/favicons`);

    // generate all the output sizes
    await Promise.all(CONFIG.outputDimensions.map((dim) => sourceFile.resize(
      dim.width,
      dim.height,
    ).toFile(getFaviconPathByDimensions(id, dim))));

    // create a copy of the source file
    await copyFile(sourcePath, `${id}/source.png`);

    // generate the .ico file for legacy browsers
    const icoBuffer = await pngToIco(sourcePath);
    await writeFile(`${id}/favicon.ico`, icoBuffer);

    // generate the receipt of the build
    await writeFile(
      `${id}/receipt.txt`,
      generateBuildReceipt(sourcePath, id, CONFIG.outputDimensions),
    );

    // finally, return the build id
    return id;
  } catch (e) {
    // in case of failure, remove the build directory and rethrow the error
    await deleteDirectory(id);
    throw e;
  }
};




/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // build process
  build,
};
