import sharp from 'sharp';
import Utilities from '../shared/utilities/utilities.js';
import FileSystemService from '../shared/file-system/file-system.service.js';

/**
 * PWA Assets Builder Service Factory
 * ...
 */
const pwaAssetsBuilderServiceFactory = () => {
  /* *******************
   * MODULE PROPERTIES *
   ******************* */

  // the list of assets that will be generated by category.
  // The logo scale is a float and can range from 0 - 1
  const __OUTPUT = {
    icons: [
      { dimensions: { width: 48, height: 48 }, logoScale: 0.065 },

      { dimensions: { width: 1024, height: 1024 }, logoScale: 1 },
    ],
  };



  /* **************
   * MISC HELPERS *
   ************** */

  /**
   * Verifies if a given background color is valid.
   * @param {*} hex
   * @returns boolean
   */
  const isBackgroundColorValid = (hex) => /^#[a-zA-Z0-9]{6}$/.test(hex);




  /* ***************
   * BUILD HELPERS *
   *************** */

  /**
   * Generates the file path for an asset.
   * @param {*} dimensions
   * @param {?} ext
   * @returns string
   */
  const __generateAssetName = (dimensions, ext = '.png') => `${Utilities.prettifyImageDimensions(dimensions)}${ext}`;

  /**
   * Creates the image that will be used for the background in every asset.
   * @param {*} dimensions
   * @param {*} backgroundColor
   * @returns sharp.Sharp
   */
  const __generateBackgroundImage = (dimensions, backgroundColor) => sharp({
    create: {
      width: dimensions.width,
      height: dimensions.height,
      channels: 3,
      background: backgroundColor,
    },
  });

  /**
   * Scales a given pixel number based.
   * @param {*} pixels
   * @param {*} scale
   * @returns number
   */
  const __scale = (pixels, scale) => Math.ceil(pixels * scale);

  /**
   * Scales a given dimensions object.
   * @param {*} dimensions
   * @param {*} scale
   * @returns object { width: number, height: number }
   */
  const __calculateScaledDimensions = (dimensions, scale) => ({
    width: __scale(dimensions.width, scale),
    height: __scale(dimensions.height, scale),
  });

  /**
   * Generates the Buffer of the scaled logo image.
   * @param {*} logoSourcePath
   * @param {*} asset
   * @returns Promise<Buffer>
   */
  const __generateLogoImage = async (logoSourcePath, asset) => {
    // initialize the file instance as well as the metadata
    const logoImage = sharp(logoSourcePath);
    const metadata = await logoImage.metadata();

    // calculate the scaled dimensions
    const scaledDimensions = __calculateScaledDimensions(
      { width: metadata.width, height: metadata.height },
      asset.logoScale,
    );

    // return the scaled logo
    return sharp(logoSourcePath).resize(
      scaledDimensions.width,
      scaledDimensions.height,
    ).toBuffer();
  };




  /* ***************
   * BUILD PROCESS *
   *************** */

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
    const bgImage = __generateBackgroundImage(
      { width: asset.dimensions.width, height: asset.dimensions.height },
      backgroundColor,
    );

    // generate the logo image
    const logoImage = await __generateLogoImage(logoSourcePath, asset);

    // compose the asset image and save it
    await bgImage.composite(
      [{ input: logoImage, blend: 'over' }],
    ).toFile(`${baseDirPath}/${__generateAssetName(asset.dimensions)}`);
  };

  /**
   * Builds all the assets for a given category.
   * @param {*} buildID
   * @param {*} logoSourcePath
   * @param {*} backgroundColor
   * @param {*} category
   */
  const __buildCategory = async (buildID, logoSourcePath, backgroundColor, category) => {
    // create the base dir
    const baseDirPath = `${buildID}/${category}`;
    await FileSystemService.makeDirectory(baseDirPath);

    // build all the assets
    await Promise.all(__OUTPUT[category].map((asset) => __buildAsset(
      baseDirPath,
      logoSourcePath,
      backgroundColor,
      asset,
    )));
  };

  /**
   * Performs the build action and outputs the result in a directory like
   * pwa-assets-build-${TIMESTAMP}
   * @param {*} logoSourcePath
   * @param {*} backgroundColor
   * @returns Promise<string>
   */
  const build = async (logoSourcePath, backgroundColor) => {
    // read the logo
    const logoSourceFile = await sharp(logoSourcePath).toBuffer();

    // initialize the identifier
    const id = Utilities.generateBuildID('pwa-assets');

    // init the assets' categories
    const categories = Object.keys(__OUTPUT);

    // create the build dir
    await FileSystemService.makeDirectory(id);

    try {
      // generate all the assets for all of the categories
      await Promise.all(categories.map((cat) => __buildCategory(
        id,
        logoSourceFile,
        backgroundColor,
        cat,
      )));

      // generate the receipt
      // @TODO

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
    // misc helpers
    isBackgroundColorValid,

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
