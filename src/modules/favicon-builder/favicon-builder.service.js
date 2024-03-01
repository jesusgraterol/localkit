import pngToIco from 'png-to-ico';
import Utilities from '../shared/utilities/utilities.js';
import FileSystemService from '../shared/file-system/file-system.service.js';
import FaviconBuilderUtils from './favicon-builder.utils.js';
import CONFIG from './favicon-builder.config.js';

/**
 * Favicon Builder Service Factory
 * Service in charge of building all the assets required to include a Favicon in a web app.
 */
const faviconBuilderServiceFactory = () => {
  /* ***************
   * BUILD PROCESS *
   *************** */

  /**
   * Performs the build action and outputs the result in a directory like favicon-build-${TIMESTAMP}
   * @param {*} sourcePath
   * @returns Promise<string>
   */
  const build = async (sourcePath) => {
    // read the source path
    const sourceFile = await FaviconBuilderUtils.readSourcePath(
      sourcePath,
      CONFIG.outputDimensions.at(-1),
    );

    // initialize the identifier
    const id = Utilities.generateBuildID('favicon');

    // create the build dir
    await FileSystemService.makeDirectory(id);

    try {
      // create the variations directory
      await FileSystemService.makeDirectory(`${id}/favicons`);

      // generate all the output sizes
      await Promise.all(CONFIG.outputDimensions.map((dim) => sourceFile.resize(
        dim.width,
        dim.height,
      ).toFile(FaviconBuilderUtils.getFaviconPathByDimensions(id, dim))));

      // create a copy of the source file
      await FileSystemService.copyFile(sourcePath, `${id}/source.png`);

      // generate the .ico file for legacy browsers
      const icoBuffer = await pngToIco(sourcePath);
      await FileSystemService.writeFile(`${id}/favicon.ico`, icoBuffer);

      // generate the receipt of the build
      await FileSystemService.writeFile(
        `${id}/receipt.txt`,
        FaviconBuilderUtils.generateBuildReceipt(sourcePath, id, CONFIG.outputDimensions),
      );

      // finally, return the build id
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
const FaviconBuilderService = faviconBuilderServiceFactory();




/**
 * Module Exports
 */
export default FaviconBuilderService;
