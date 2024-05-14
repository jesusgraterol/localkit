import { format } from 'date-fns';

/* ************************************************************************************************
 *                                         BUILD HELPERS                                          *
 ************************************************************************************************ */

/**
 * Generates the identifier of the current build. This value will be used to create the root
 * directory of the build.
 * @returns string
 */
const generateBuildID = (buildName) => `${buildName}-build-${Date.now()}`;

/**
 * Converts a dimensions object into a string. For example:
 * { width: 256, height: 256 } -> '256x256'
 * @param {*} dimensions
 * @returns string
 */
const prettifyImageDimensions = ({ width = 0, height = 0 } = {}) => `${width}x${height}`;





/* ************************************************************************************************
 *                                          MISC HELPERS                                          *
 ************************************************************************************************ */

/**
 * Formats a timestamp or the current time if none is provided.
 * @param {?} timestamp
 * @param {?} dateFormat
 * @returns string
 */
const formatDate = (
  timestamp = undefined,
  dateFormat = 'dd/MM/yyyy, hh:mm:ss a',
) => format(typeof timestamp === 'number' ? new Date(timestamp) : new Date(), dateFormat);


/**
 * Builds the header of the CLI based on the extracted version.
 * @param {?} version
 * @returns string
 */
const buildCLIHeader = (version) => {
  let header = 'localkit';
  if (typeof version === 'string') {
    header += ` v${version}`;
  }
  return `\n${header}\n`;
};


/**
 * Outputs the given content to the terminal.
 * @param {*} title
 * @param {*} content
 * @param {?} includeDate
 * @param {?} includeBorders
 */
const print = (title, content, includeDate = false, includeBorders = true) => {
  if (includeBorders) console.log('\n========================================\n');
  console.log(`${title}`);
  if (includeDate) console.log(formatDate());
  console.log('\n');
  if (typeof content === 'string') {
    console.log(content);
  } else if (Array.isArray(content)) {
    content.forEach((item) => {
      console.log(item);
    });
  } else {
    throw new Error('The content must be a string or a string array.');
  }
  if (includeBorders) console.log('\n========================================');
};


/**
 * Creates a delay which duration is based on the amount of provided seconds.
 * @returns Promise<void>
 */
const delay = (seconds) => new Promise((resolve) => { setTimeout(resolve, seconds * 1000); });




/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // build helpers
  generateBuildID,
  prettifyImageDimensions,

  // misc helpers
  formatDate,
  buildCLIHeader,
  print,
  delay,
};
