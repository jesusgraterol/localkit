import sharp from 'sharp';
import Utilities from '../shared/utilities/utilities.js';

/**
 * Favicon Builder Utils Factory
 * Module in charge of providing helper functions in order to simplify the build process.
 */
const faviconBuilderUtilsFactory = () => {
  /* **************
   * MISC HELPERS *
   ************** */

  /**
   * Generates the name of a favicon file based on its dimensions.
   * @param {*} dimensions
   * @returns string
   */
  const __getFaviconNameByDimensions = (dimensions) => `${Utilities.prettifyImageDimensions(dimensions)}.png`;

  /**
   * Builds the path for a favicon based on its dimension.
   * @param {*} buildID
   * @param {*} dimensions
   * @returns string
   */
  const getFaviconPathByDimensions = (buildID, dimensions) => `${buildID}/favicons/${__getFaviconNameByDimensions(dimensions)}`;

  /**
   * Reads the file from the source path, ensures it meets the dimensions requirement and returns
   * the instance.
   * @param {*} sourcePath
   * @param {*} dimensionsRequirement
   * @returns Promise<Sharp>
   */
  const readSourcePath = async (sourcePath, dimensionsRequirement) => {
    // init the instance
    const source = sharp(sourcePath);

    // extract the metadata and ensure it matches the requirements
    const metadata = await source.metadata();
    if (
      dimensionsRequirement.width > metadata.width
      || dimensionsRequirement.height > metadata.height
    ) {
      throw new Error(`The dimensions of the source file should be: ${Utilities.prettifyImageDimensions(dimensionsRequirement)} minimum`);
    }

    // return the instance of the source file
    return source;
  };





  /* ***************
   * BUILD RECEIPT *
   *************** */

  /**
   * Generates the list of favicon variations created during the build.
   * @param {*} prefix
   * @param {*} outputDimensions
   * @returns string
   */
  const __generateFaviconVariationsReceipt = (prefix, outputDimensions) => outputDimensions.reduce(
    (prev, current, index) => `${prev}${index !== 0 ? '\n' : ''}${prefix}${__getFaviconNameByDimensions(current)}`,
    '',
  );

  /**
   * Builds the receipt once all the build files have been generated.
   * @param {*} sourcePath
   * @param {*} buildID
   * @param {*} outputDimensions
   * @returns string
   */
  const generateBuildReceipt = (sourcePath, buildID, outputDimensions) => {
    // init the receipt
    let receipt = buildID.toUpperCase();
    receipt += `\n${Utilities.formatDate()}`;

    // input
    receipt += '\n\nINPUT:';
    receipt += `\n${sourcePath}`;

    // output
    receipt += '\n\nOUTPUT:';
    receipt += `\n${buildID}`;
    receipt += '\n    favicon.ico';
    receipt += '\n    source.png';
    receipt += '\n    favicons/';
    receipt += `\n${__generateFaviconVariationsReceipt('        ')}`;

    // usage
    const smallestReq = outputDimensions[0];
    const largestReq = outputDimensions.at(-1);
    receipt += '\n\nUSAGE:';
    receipt += '\n1) Include the favicon.ico into the project\'s root';
    // eslint-disable-next-line no-template-curly-in-string
    receipt += '\n2) Place the favicons directory inside of the project\'s root. Resulting in /${PROJECT_ROOT}/favicons';
    receipt += '\n3) Include the following tags inside of the app\'s <head>...</head>:';
    receipt += '\n<!-- Favicon -->';
    receipt += `\n<link rel="icon" type="image/png" sizes="${Utilities.prettifyImageDimensions(smallestReq)}" href="favicons/${__getFaviconNameByDimensions(smallestReq)}">`;
    receipt += '\n...';
    receipt += `\n<link rel="icon" type="image/png" sizes="${Utilities.prettifyImageDimensions(largestReq)}" href="favicons/${__getFaviconNameByDimensions(largestReq)}">`;

    // finally, return the receipt
    return receipt;
  };



  /* **************
   * MODULE BUILD *
   ************** */
  return Object.freeze({
    // misc helpers
    getFaviconPathByDimensions,
    readSourcePath,

    // build receipt
    generateBuildReceipt,
  });
};




/**
 * Global Instance
 */
const FaviconBuilderUtils = faviconBuilderUtilsFactory();




/**
 * Module Exports
 */
export default FaviconBuilderUtils;