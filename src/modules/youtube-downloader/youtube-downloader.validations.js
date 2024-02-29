import ytdl from 'ytdl-core';

/**
 * Youtube Downloader Validations Factory
 * Module in charge of providing data validation functions.
 */
const youtubeDownloaderValidationsFactory = () => {
  /* *********************
   * GENERAL VALIDATIONS *
   ********************* */

  /**
   * Ensures the provided URL belongs to Youtube and that the video ID can be extracted.
   * @param {*} url
   * @returns boolean
   */
  const isURLValid = (url) => ytdl.validateURL(url);





  /* **************
   * MODULE BUILD *
   ************** */
  return Object.freeze({
    // general validations
    isURLValid,
  });
};




/**
 * Global Instance
 */
const YouTubeDownloaderValidations = youtubeDownloaderValidationsFactory();





/**
 * Module Exports
 */
export default YouTubeDownloaderValidations;
