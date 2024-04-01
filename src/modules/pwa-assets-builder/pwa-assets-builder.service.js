import Utilities from '../shared/utilities/utilities.js';
import FileSystemService from '../shared/file-system/file-system.service.js';
import PWAAssetsBuilderUtils from './pwa-assets-builder.utils.js';
import CONFIG from './pwa-assets-builder.config.js';

/**
 * PWA Assets Builder Service Factory
 * Service in charge of building all the assets required for a PWA to be properly published.
 */
const pwaAssetsBuilderServiceFactory = () => {
  /* **************
   * ASSETS BUILD *
   ************** */

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
    const bgImage = PWAAssetsBuilderUtils.generateBackgroundImage(
      { width: asset.dimensions.width, height: asset.dimensions.height },
      backgroundColor,
    );

    // generate the logo image
    const logoImage = await PWAAssetsBuilderUtils.generateLogoImage(
      logoSourcePath,
      asset,
      CONFIG.logoDimensionsRequirement,
    );

    // compose the asset image and save it
    await bgImage.composite(
      [{ input: logoImage, blend: 'over' }],
    ).toFile(`${baseDirPath}/${PWAAssetsBuilderUtils.generateAssetName(asset.dimensions)}`);
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
    await FileSystemService.makeDirectory(baseDirPath);

    // build all the assets
    await Promise.all(CONFIG.output[category].map((asset) => __buildAsset(
      baseDirPath,
      logoSourcePath,
      backgroundColor,
      asset,
    )));
  };




  /**
   * Builds and saves the manifest file.
   * @param {*} buildID
   * @returns Promise<void>
   */
  const __buildAndSaveManifestFile = (buildID, backgroundColor) => FileSystemService.writeFile(
    `${buildID}/manifest.webmanifest`,
    JSON.stringify(
      PWAAssetsBuilderUtils.buildManifestFile(
        CONFIG.output.icons,
        backgroundColor,
      ),
      undefined,
      2,
    ),
  );




  /* ***************
   * BUILD PROCESS *
   *************** */

  /**
   * Performs the build action and outputs the result in a directory like
   * pwa-assets-build-${TIMESTAMP}
   * @param {*} logoSourcePath
   * @param {*} backgroundColor
   * @returns Promise<string>
   */
  const build = async (logoSourcePath, backgroundColor) => {
    // initialize the identifier as well as the assets' root path
    const id = Utilities.generateBuildID('pwa-assets');
    const assetsRootPath = `${id}/pwa-assets`;

    // create the build and the assets root dirs
    await FileSystemService.makeDirectory(id);
    await FileSystemService.makeDirectory(assetsRootPath);

    try {
      // init the output's categories
      const categories = Object.keys(CONFIG.output);

      // generate all the assets for all of the categories
      await Promise.all(categories.map((category) => __buildCategory(
        assetsRootPath,
        logoSourcePath,
        backgroundColor,
        category,
      )));

      // generate the manifest file
      await __buildAndSaveManifestFile(id, backgroundColor);

      // generate the receipt
      // @TODO

      // create a copy of the source file
      await FileSystemService.copyFile(logoSourcePath, `${id}/source.png`);

      // finally, return the id
      return id;
    } catch (e) {
      // in case of failure, remove the build directory and rethrow the error
      await FileSystemService.deleteDirectory(id);
      throw e;
    }
  };



  /* **************
   * MODULE BUILD *
   ************** */
  return Object.freeze({
    // build process
    build,
  });
};




/**
 * Global Instance
 */
const PWAAssetsBuilderService = pwaAssetsBuilderServiceFactory();




/**
 * Module Exports
 */
export default PWAAssetsBuilderService;
