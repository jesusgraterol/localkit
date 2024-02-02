import cp from 'child_process';
import ytdl from 'ytdl-core';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'ffmpeg-static';
import fluentffmpeg from 'fluent-ffmpeg';





/**
 * Set the correct path for the ffmpeg to be used
 * https://stackoverflow.com/questions/45555960/nodejs-fluent-ffmpeg-cannot-find-ffmpeg
 */
fluentffmpeg.setFfmpegPath(ffmpegPath.path);




/**
 * Youtube Downloader Service Factory
 * Service in charge of downloading Youtube Videos.
 */
const youtubeDownloaderServiceFactory = () => {
  /* **************
   * MISC HELPERS *
   ************** */

  /**
   * Ensures the provided URL belongs to Youtube and that the video ID can be extracted.
   * @param {*} url
   * @returns boolean
   */
  const isURLValid = (url) => ytdl.validateURL(url);

  /**
   * Extracts the video ID from a Youtube URL. Throws an error if it is unable to do so.
   * @param {*} url
   * @returns string
   */
  const __getVideoID = (url) => ytdl.getURLVideoID(url);

  /**
   * Retrieves the name of the file based on a URL and a format.
   * @param {*} url
   * @param {*} format
   * @returns string
   */
  const __getFileName = (url, format) => `${__getVideoID(url)}.${format}`;





  /* ******************
   * DOWNLOAD ACTIONS *
   ****************** */

  /**
   * Downloads a Youtube Video & Audio based on a given URL.
   * @param {*} url
   * @returns Promise<string>
   */
  const downloadVideo = (url) => new Promise((resolve, reject) => {
    // build the file name (videoID.extension)
    const fileName = __getFileName(url, 'mp4');

    // init the audio and video streams
    const audio = ytdl(url, { quality: 'highestaudio' });
    const video = ytdl(url, { quality: 'highestvideo' });

    // start the ffmpeg child process
    const ffmpegProcess = cp.spawn(ffmpeg, [
      // remove ffmpeg's console spamming
      '-loglevel', '8', '-hide_banner',

      // redirect/enable progress messages
      '-progress', 'pipe:3',

      // set inputs
      '-i', 'pipe:4',
      '-i', 'pipe:5',

      // map audio & video from streams
      '-map', '0:a',
      '-map', '1:v',

      // keep encoding
      '-c:v', 'copy',

      // define output file
      fileName,
    ], {
      windowsHide: true,
      stdio: [
        /* Standard: stdin, stdout, stderr */
        'inherit', 'inherit', 'inherit',
        /* Custom: pipe:3, pipe:4, pipe:5 */
        'pipe', 'pipe', 'pipe',
      ],
    });

    // error handler
    ffmpegProcess.on('error', reject);

    // completion handler
    ffmpegProcess.on('close', () => {
      resolve(fileName);
    });

    // start the download
    audio.pipe(ffmpegProcess.stdio[4]);
    video.pipe(ffmpegProcess.stdio[5]);
  });

  /**
   * Downloads a Youtube Video and it extracts the audio based on a given URL.
   * @param {*} url
   * @returns string
   */
  const downloadAudio = (url) => new Promise((resolve, reject) => {
    // build the file name (videoID.extension)
    const fileName = __getFileName(url, 'mp3');

    // init the stream and download the audio file
    const stream = ytdl(url, { quality: 'highestaudio' });
    fluentffmpeg(stream)
      .audioBitrate(128)
      .save(fileName)
      .on('error', (e) => {
        reject(e);
      })
      .on('end', () => {
        resolve(fileName);
      });
  });


  /* **************
   * MODULE BUILD *
   ************** */
  return Object.freeze({
    // misc helpers
    isURLValid,

    // download actions
    downloadVideo,
    downloadAudio,
  });
};




/**
 * Global Instance
 */
const YouTubeDownloaderService = youtubeDownloaderServiceFactory();





/**
 * Module Exports
 */
export default YouTubeDownloaderService;
