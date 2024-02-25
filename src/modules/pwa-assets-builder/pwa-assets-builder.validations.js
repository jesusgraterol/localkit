
/**
 * PWA Assets Builder Validations Factory
 * Module in charge of validating user's input.
 */
const pwaAssetsBuilderValidationsFactory = () => {
  /* *********************
   * GENERAL VALIDATIONS *
   ********************* */

  /**
   * Verifies if a given hex color string is valid.
   * @param {*} hex
   * @returns boolean
   */
  const isHexadecimalColorValid = (hex) => /^#[a-zA-Z0-9]{6}$/.test(hex);





  /* **************
   * MODULE BUILD *
   ************** */
  return Object.freeze({
    // general validations
    isHexadecimalColorValid,
  });
};




/**
 * Global Instance
 */
const PWAAssetsBuilderValidations = pwaAssetsBuilderValidationsFactory();




/**
 * Module Exports
 */
export default PWAAssetsBuilderValidations;
