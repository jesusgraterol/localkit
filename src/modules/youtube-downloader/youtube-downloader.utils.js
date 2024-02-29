import ytdl from 'ytdl-core';

/**
 * Youtube Downloader Utils Factory
 * Module in charge of providing helper functions in order to simplify the downloading of Youtube
 * content.
 */
const youtubeDownloaderUtilsFactory = () => {
  /* **************
   * MISC HELPERS *
   ************** */

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
  const getFileName = (url, format) => `${getVideoID(url)}.${format}`;





  /* **************
   * MODULE BUILD *
   ************** */
  return Object.freeze({
    // misc helpers
    getVideoID,
    getFileName,
  });
};




/**
 * Global Instance
 */
const YouTubeDownloaderUtils = youtubeDownloaderUtilsFactory();





/**
 * Module Exports
 */
export default YouTubeDownloaderUtils;
