

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
   * ... pwa-assets-build-${TIMESTAMP}
   * @param {*} logoSourcePath
   * @param {*} backgroundColor
   * @returns Promise<void>
   */
  const build = async (logoSourcePath, backgroundColor) => {
    // ...
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
