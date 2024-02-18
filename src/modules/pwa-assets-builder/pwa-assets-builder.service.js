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

  // ...




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
    // read the logo
    const logoSourceFile = sharp(logoSourcePath);
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
