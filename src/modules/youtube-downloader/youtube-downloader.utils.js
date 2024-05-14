import ytdl from 'ytdl-core';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Extracts the video ID from a Youtube URL. Throws an error if it is unable to do so.
 * @param {*} url
 * @returns string
 */
const getVideoID = (url) => ytdl.getURLVideoID(url);

/**
 * Retrieves the name of the file based on a URL and a format.
 * @param {*} url
 * @param {*} format
 * @returns string
 */
const getFileName = (url, format) => `youtube-${getVideoID(url)}.${format}`;





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // misc helpers
  getVideoID,
  getFileName,
};
