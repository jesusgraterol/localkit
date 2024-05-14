import ytdl from 'ytdl-core';

/* ************************************************************************************************
 *                                      GENERAL VALIDATIONS                                       *
 ************************************************************************************************ */

/**
 * Ensures the provided URL belongs to Youtube and that the video ID can be extracted.
 * @param {*} url
 * @returns boolean
 */
const isURLValid = (url) => ytdl.validateURL(url);





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // general validations
  isURLValid,
};
