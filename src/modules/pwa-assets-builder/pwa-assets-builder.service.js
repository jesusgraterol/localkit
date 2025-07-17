import { generateBuildID } from '../shared/utilities/utilities.js';
import {
  makeDirectory,
  copyFile,
  writeFile,
  deleteDirectory,
} from '../shared/file-system/file-system.service.js';
import {
  generateBackgroundImage,
  generateLogoImage,
  generateAssetName,
  buildManifestFile,
  buildReceiptFile,
} from './pwa-assets-builder.utils.js';
import { CONFIG } from './pwa-assets-builder.config.js';

/* ************************************************************************************************
 *                                          ASSETS BUILD                                          *
 ************************************************************************************************ */

/**
 * Builds an asset and saves it in the appropriate category.
 * @param {*} baseDirPath
 * @param {*} logoSourcePath
 * @param {*} backgroundColor
 * @param {*} asset
 * @returns Promise<void>
 */
const __buildAsset = async (baseDirPath, logoSourcePath, backgroundColor, asset) => {
  // generate the background image
  const bgImage = generateBackgroundImage(
    { width: asset.dimensions.width, height: asset.dimensions.height },
    backgroundColor,
  );

  // generate the logo image
  const logoImage = await generateLogoImage(
    logoSourcePath,
    asset,
    CONFIG.logoDimensionsRequirement,
  );

  // compose the asset image and save it
  await bgImage
    .composite([{ input: logoImage, blend: 'over' }])
    .toFile(`${baseDirPath}/${generateAssetName(asset.dimensions)}`);
};

/**
 * Builds all the assets for a given category.
 * @param {*} assetsRootPath
 * @param {*} logoSourcePath
 * @param {*} backgroundColor
 * @param {*} category
 */
const __buildCategory = async (assetsRootPath, logoSourcePath, backgroundColor, category) => {
  // create the base dir
  const baseDirPath = `${assetsRootPath}/${category}`;
  await makeDirectory(baseDirPath);

  // build all the assets
  await Promise.all(
    CONFIG.output[category].map((asset) =>
      __buildAsset(baseDirPath, logoSourcePath, backgroundColor, asset),
    ),
  );
};

/**
 * Builds and saves the manifest file.
 * @param {*} buildID
 * @returns Promise<void>
 */
const __buildAndSaveManifestFile = (buildID, backgroundColor) =>
  writeFile(
    `${buildID}/manifest.webmanifest`,
    JSON.stringify(buildManifestFile(CONFIG.output.icons, backgroundColor), undefined, 2),
  );

/**
 * Builds and saves the receipt file.
 * @param {*} sourcePath
 * @param {*} backgroundColor
 * @param {*} buildID
 * @param {*} assetsRootPath
 * @param {*} outputConfig
 * @returns Promise<void>
 */
const __buildAndSaveReceiptFile = (
  sourcePath,
  backgroundColor,
  buildID,
  assetsRootPath,
  outputConfig,
) =>
  writeFile(
    `${buildID}/receipt.txt`,
    buildReceiptFile(sourcePath, backgroundColor, buildID, assetsRootPath, outputConfig),
  );

/* ************************************************************************************************
 *                                         BUILD PROCESS                                          *
 ************************************************************************************************ */

/**
 * Performs the build action and outputs the result in a directory like
 * pwa-assets-build-${TIMESTAMP}
 * @param {*} logoSourcePath
 * @param {*} backgroundColor
 * @returns Promise<string>
 */
const build = async (logoSourcePath, backgroundColor) => {
  // initialize the identifier as well as the assets' root path
  const id = generateBuildID('pwa-assets');
  const assetsRootPath = `${id}/pwa-assets`;

  // create the build and the assets root dirs
  await makeDirectory(id);
  await makeDirectory(assetsRootPath);

  try {
    // init the output's categories
    const categories = Object.keys(CONFIG.output);

    // generate all the assets for all of the categories
    await Promise.all(
      categories.map((category) =>
        __buildCategory(assetsRootPath, logoSourcePath, backgroundColor, category),
      ),
    );

    // generate the manifest file
    await __buildAndSaveManifestFile(id, backgroundColor);

    // create a copy of the source file
    await copyFile(logoSourcePath, `${id}/source.png`);

    // generate the receipt file
    await __buildAndSaveReceiptFile(logoSourcePath, backgroundColor, id, CONFIG.output);

    // finally, return the id
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
