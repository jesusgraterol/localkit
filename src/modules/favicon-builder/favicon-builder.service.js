import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import Utilities from '../shared/utilities/utilities.js';
import FileSystemService from '../shared/file-system/file-system.service.js';

/**
 * Favicon Builder Service
 * Service in charge of building all the assets required to include a Favicon in a web app.
 */
class FaviconBuilderService {
  // the list of dimensions (in pixels) that will be generated and included in the build.
  // important: this list should be kept in ascending order.
  static #OUTPUT_DIMENSIONS = [
    { width: 16, height: 16 },
    { width: 32, height: 32 },
    { width: 48, height: 48 },
    { width: 64, height: 64 },
    { width: 96, height: 96 },
    { width: 112, height: 112 },
    { width: 128, height: 128 },
    { width: 144, height: 144 },
    { width: 160, height: 160 },
    { width: 176, height: 176 },
    { width: 192, height: 192 },
    { width: 208, height: 208 },
    { width: 224, height: 224 },
    { width: 240, height: 240 },
    { width: 256, height: 256 },
    { width: 384, height: 384 },
    { width: 512, height: 512 },
  ];




  /* ***************
   * BUILD PROCESS *
   *************** */

  /**
   * Performs the build action and outputs the result in a directory like favicon-build-${TIMESTAMP}
   * @param {*} sourcePath
   * @returns Promise<void>
   */
  static async build(sourcePath) {
    // read the source path
    const sourceFile = await FaviconBuilderService.#readSourcePath(sourcePath);

    // initialize the identifier
    const id = FaviconBuilderService.#getBuildID();

    // create the dirs
    await FileSystemService.makeDirectory(id);
    await FileSystemService.makeDirectory(`${id}/favicons`);

    // generate all the output sizes
    await Promise.all(FaviconBuilderService.#OUTPUT_DIMENSIONS.map((dim) => sourceFile.resize(
      dim.width,
      dim.height,
    ).toFile(FaviconBuilderService.#getFaviconPathByDimensions(id, dim))));

    // create a copy of the source file
    await FileSystemService.copyFile(sourcePath, `${id}/source.png`);

    // generate the .ico file for legacy browsers
    const icoBuffer = await pngToIco(sourcePath);
    await FileSystemService.writeFileBuffer(`${id}/favicon.ico`, icoBuffer);

    // generate the receipt of the build
    await FileSystemService.writeFile(
      `${id}/receipt.txt`,
      FaviconBuilderService.#generateBuildReceipt(sourcePath, id),
    );

    // finally, return the build id
    return id;
  }




  /* **************
   * MISC HELPERS *
   ************** */

  /**
   * Reads the file from the source path, ensures it meets the dimensions requirement and returns
   * the instance.
   * @param {*} sourcePath
   * @returns Promise<Sharp>
   */
  static async #readSourcePath(sourcePath) {
    // init the instance
    const source = sharp(sourcePath);

    // extract the metadata and ensure it matches the requirements
    const metadata = await source.metadata();
    const largestReq = FaviconBuilderService.#OUTPUT_DIMENSIONS.at(-1);
    if (largestReq.width > metadata.width || largestReq.height > metadata.height) {
      throw new Error(`The dimensions of the source file should be: ${FaviconBuilderService.#prettifyDimensions(largestReq)} minimum`);
    }

    // return the instance of the source file
    return source;
  }

  /**
   * Retrieves the identifier of the current build. This value will be used to create the root
   * directory of the build.
   * @returns string
   */
  static #getBuildID() {
    return `favicon-build-${Date.now()}`;
  }

  /**
   * Converts a dimensions object into a string. For example:
   * { width: 256, height: 256 } -> '256x256'
   * @param {*} dimensions
   * @returns string
   */
  static #prettifyDimensions(dimensions) {
    return `${dimensions.width}x${dimensions.height}`;
  }

  /**
   * Generates the name of a favicon file based on its dimensions.
   * @param {*} dimensions
   * @returns string
   */
  static #getFaviconNameByDimensions(dimensions) {
    return `favicon-${FaviconBuilderService.#prettifyDimensions(dimensions)}.png`;
  }

  /**
   * Builds the path for a favicon based on its dimension.
   * @param {*} buildID
   * @param {*} dimensions
   * @returns string
   */
  static #getFaviconPathByDimensions(buildID, dimensions) {
    return `${buildID}/favicons/${FaviconBuilderService.#getFaviconNameByDimensions(dimensions)}`;
  }

  /**
   * Builds the receipt once all the build files have been generated.
   * @param {*} sourcePath
   * @param {*} buildID
   * @returns string
   */
  static #generateBuildReceipt(sourcePath, buildID) {
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
    receipt += '\n    source.ico';
    receipt += '\n    favicons/';
    receipt += `\n${FaviconBuilderService.#generateFaviconVariationsReceipt('        ')}`;

    // usage
    const smallestReq = FaviconBuilderService.#OUTPUT_DIMENSIONS[0];
    const largestReq = FaviconBuilderService.#OUTPUT_DIMENSIONS.at(-1);
    receipt += '\n\nUSAGE:';
    receipt += '\n1) Include the favicon.ico into the project\'s root';
    receipt += `\n2) Place the ${buildID}/favicons/ directory inside of the project's root`;
    receipt += '\n3) Include the following tags inside of the app\'s <head>...</head>:';
    receipt += '\n<!-- Favicon -->';
    receipt += `\n<link rel="icon" type="image/png" sizes="${FaviconBuilderService.#prettifyDimensions(smallestReq)}" href="${FaviconBuilderService.#getFaviconNameByDimensions(smallestReq)}">`;
    receipt += '\n...';
    receipt += `\n<link rel="icon" type="image/png" sizes="${FaviconBuilderService.#prettifyDimensions(largestReq)}" href="${FaviconBuilderService.#getFaviconNameByDimensions(largestReq)}">`;


    // finally, return the receipt
    return receipt;
  }

  /**
   * Generates the list of favicon variations generated during the build
   * @param {*} prefix
   * @returns string
   */
  static #generateFaviconVariationsReceipt(prefix) {
    return FaviconBuilderService.#OUTPUT_DIMENSIONS.reduce(
      (prev, current, index) => `${prev}${index !== 0 ? '\n' : ''}${prefix}${FaviconBuilderService.#getFaviconNameByDimensions(current)}`,
      '',
    );
  }
}




/**
 * Module Exports
 */
export default FaviconBuilderService;
