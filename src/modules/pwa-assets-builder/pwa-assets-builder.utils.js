import sharp from 'sharp';
import Utilities from '../shared/utilities/utilities.js';
import MANIFEST_FILE from './manifest-template.js';

/**
 * PWA Assets Builder Utils Factory
 * Service in charge of providing a series of utilities that help simplify the build process.
 */
const pwaAssetsBuilderUtilsFactory = () => {
  /* ************************
   * ASSETS BUILD UTILITIES *
   ************************ */

  /**
   * Generates the file path for an asset.
   * @param {*} dimensions
   * @param {?} ext
   * @returns string
   */
  const generateAssetName = (dimensions, ext = '.png') => `${Utilities.prettifyImageDimensions(dimensions)}${ext}`;

  /**
   * Creates the image that will be used for the background in every asset.
   * @param {*} dimensions
   * @param {*} backgroundColor
   * @returns sharp.Sharp
   */
  const generateBackgroundImage = (dimensions, backgroundColor) => sharp({
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
   * @param {*} requiredDimensions
   * @returns Promise<Buffer>
   */
  const generateLogoImage = async (logoSourcePath, asset, requiredDimensions) => {
    // initialize the file instance as well as the metadata
    const logoImage = sharp(logoSourcePath);
    const metadata = await logoImage.metadata();
    if (
      metadata.width !== requiredDimensions.width
      || metadata.height !== requiredDimensions.height
    ) {
      throw new Error(`The required logo dimensions are: ${Utilities.prettifyImageDimensions(requiredDimensions)}. Received: ${Utilities.prettifyImageDimensions(metadata)}`);
    }

    // calculate the scaled dimensions
    const scaledDimensions = __calculateScaledDimensions(
      { width: metadata.width, height: metadata.height },
      asset.logoScale,
    );

    // return the scaled logo
    return logoImage.resize(
      scaledDimensions.width,
      scaledDimensions.height,
    ).toBuffer();
  };




  /* **************************
   * MANIFEST BUILD UTILITIES *
   ************************** */

  /**
   * Builds the object for an icon that will be included in the manifest file.
   * @param {*} icon
   * @returns object
   */
  const __buildManifestIcon = (icon) => {
    const dimStr = Utilities.prettifyImageDimensions(icon.dimensions);
    return {
      src: `pwa-assets/icons/${dimStr}.png`,
      sizes: dimStr,
      type: 'image/png',
      purpose: 'any',
    };
  };

  /**
   * Builds the manifest file based on the template.
   * @param {*} icons
   * @returns object
   */
  const buildManifestFile = (icons) => ({
    ...MANIFEST_FILE,
    icons: icons.map(__buildManifestIcon),
  });




  /* **************
   * MODULE BUILD *
   ************** */
  return Object.freeze({
    // assets build utilities
    generateAssetName,
    generateBackgroundImage,
    generateLogoImage,

    // manifest build utilities
    buildManifestFile,
  });
};




/**
 * Global Instance
 */
const PWAAssetsBuilderUtils = pwaAssetsBuilderUtilsFactory();




/**
 * Module Exports
 */
export default PWAAssetsBuilderUtils;
