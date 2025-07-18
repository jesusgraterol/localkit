/* ************************************************************************************************
 *                                       GENERAL VALIDATIONS                                      *
 ************************************************************************************************ */

/**
 * Verifies if a given hex color string is valid.
 * @param {*} hex
 * @returns boolean
 */
const isHexadecimalColorValid = (hex) => /^#[a-zA-Z0-9]{6}$/.test(hex);

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // general validations
  isHexadecimalColorValid,
};
