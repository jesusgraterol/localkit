
/**
 * Material Icons
 * The follownig implementation downloads the icons from Google's Official Respository and generates
 * the required stylesheet so the icons can be installed as a module in any project.
 *
 * The repo's URL is:
 * https://github.com/google/material-design-icons
 *
 * The source files' URL is:
 * https://github.com/google/material-design-icons/tree/master/variablefont
 *
 * The developers' guide can be found here:
 * https://developers.google.com/fonts/docs/material_symbols
 *
 *
 * IMPORTANT: The filled icons don't have a specific file, they can be enabled by setting the 
 * variation settings property as follows:
 * font-variation-settings: 'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 48;
 */

/* ************************************************************************************************
 *                                           CONSTANTS                                            *
 ************************************************************************************************ */

// the list of supported styles as well as the download URLs
const ICON_STYLES = [
  {
    name: 'Outlined',
    url: 'https://github.com/google/material-design-icons/blob/master/variablefont/MaterialSymbolsOutlined%5BFILL%2CGRAD%2Copsz%2Cwght%5D.woff2',
  },
  {
    name: 'Rounded',
    url: 'https://github.com/google/material-design-icons/blob/master/variablefont/MaterialSymbolsRounded%5BFILL%2CGRAD%2Copsz%2Cwght%5D.woff2',
  },
  {
    name: 'Sharp',
    url: 'https://github.com/google/material-design-icons/blob/master/variablefont/MaterialSymbolsSharp%5BFILL%2CGRAD%2Copsz%2Cwght%5D.woff2',
  },
];

// the directory in which the installation will be placed
const OUT_DIR = 'material-icons';

// the icons' source file name
const ICONS_FILE_NAME = 'icons.woff2';

// the name of the stylesheet file
const STYLESHEET_FILE_NAME = 'index.css';


/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Downloads and generates the required stylesheet for the provided style.
 * @param {*} style
 * @param {?} filled
 * @returns Promise<void>
 */
const install = async (style, filled = false) => {

};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // constants
  ICON_STYLES,
  OUT_DIR,
  ICONS_FILE_NAME,
  STYLESHEET_FILE_NAME,

  // implementation
  install,
};
