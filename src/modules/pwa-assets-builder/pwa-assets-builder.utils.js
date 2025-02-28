import sharp from 'sharp';
import { prettifyImageDimensions, formatDate } from '../shared/utilities/utilities.js';
import { MANIFEST_FILE } from './manifest-template.js';

/* ************************************************************************************************
 *                                     ASSETS BUILD UTILITIES                                     *
 ************************************************************************************************ */

/**
 * Generates the file path for an asset.
 * @param {*} dimensions
 * @param {?} ext
 * @returns string
 */
const generateAssetName = (dimensions, ext = '.png') => `${prettifyImageDimensions(dimensions)}${ext}`;

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
    throw new Error(`The required logo dimensions are: ${prettifyImageDimensions(requiredDimensions)}. Received: ${prettifyImageDimensions(metadata)}`);
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




/* ************************************************************************************************
 *                                    MANIFEST BUILD UTILITIES                                    *
 ************************************************************************************************ */

/**
 * Builds the object for an icon that will be included in the manifest file.
 * @param {*} icon
 * @returns object
 */
const __buildManifestIcon = (icon) => {
  const dimStr = prettifyImageDimensions(icon.dimensions);
  return {
    src: `pwa-assets/icons/${dimStr}.png`,
    sizes: dimStr,
    type: 'image/png',
    purpose: 'maskable any',
  };
};

/**
 * Builds the manifest file based on the template.
 * @param {*} icons
 * @param {*} backgroundColor
 * @returns object
 */
const buildManifestFile = (icons, backgroundColor) => ({
  ...MANIFEST_FILE,
  theme_color: backgroundColor,
  background_color: backgroundColor,
  icons: icons.map(__buildManifestIcon),
});




/* ************************************************************************************************
 *                                    RECEIPT BUILD UTILITIES                                     *
 ************************************************************************************************ */

/**
 * Retrieves the name of the asset based on its dimensions. e.g: 256x256.png.
 * @param {*} dimensions
 * @returns string
 */
const __getAssetNameByDimensions = (dimensions) => `${prettifyImageDimensions(dimensions)}.png`;

/**
 * Generates the whole list of assets for a category.
 * @param {*} prefix
 * @param {*} outputDimensions
 * @returns string
 */
const __generateAssetVariationsReceipt = (prefix, outputDimensions) => outputDimensions.reduce(
  (prev, current, index) => `${prev}${index !== 0 ? '\n' : ''}${prefix}${__getAssetNameByDimensions(current.dimensions)}`,
  '',
);

/**
 * Builds the contents that will be stored in the receipt file.
 * @param {*} sourcePath
 * @param {*} backgroundColor
 * @param {*} buildID
 * @param {*} outputConfig
 * @returns string
 */
const buildReceiptFile = (sourcePath, backgroundColor, buildID, outputConfig) => {
  // init the receipt
  let receipt = buildID.toUpperCase();
  receipt += `\n${formatDate()}`;

  // input
  receipt += '\n\nINPUT:';
  receipt += `\nSource Path: ${sourcePath}`;
  receipt += `\nBackground Color: ${backgroundColor}`;

  // output
  receipt += '\n\nOUTPUT:';
  receipt += `\n${buildID}`;
  receipt += '\n    manifest.webmanifest';
  receipt += '\n    source.png';
  receipt += '\n    pwa-assets/';
  Object.keys(outputConfig).forEach((category) => {
    receipt += `\n        ${category}/`;
    receipt += `\n${__generateAssetVariationsReceipt('            ', outputConfig[category])}`;
  });

  // footer
  receipt += '\n\nFor more information on how to include these assets in your project, visit:';
  receipt += '\nhttps://github.com/jesusgraterol/localkit/blob/main/readme-assets/modules/PWA_ASSETS_BUILDER/README.md';

  // finally, return the receipt
  return receipt;
};




/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // assets build utilities
  generateAssetName,
  generateBackgroundImage,
  generateLogoImage,

  // manifest build utilities
  buildManifestFile,

  // receipt build utilities
  buildReceiptFile,
};
