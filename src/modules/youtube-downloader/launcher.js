import select from '@inquirer/select';
import { input } from '@inquirer/prompts';
import YoutubeDownloaderValidations from './youtube-downloader.validations.js';
import YouTubeDownloaderService from './youtube-downloader.service.js';
import Utilities from '../shared/utilities/utilities.js';

/**
 * Module Launcher
 */
export default async function moduleLauncher() {
  // read the user input
  const answers = {
    action: await select({
      message: 'Select an action',
      choices: [
        {
          name: 'Download Video',
          value: 'download_video',
          description: 'Downloads a Youtube Video in mp4 format.',
        },
        {
          name: 'Download Audio',
          value: 'download_audio',
          description: 'Downloads a Youtube Video and extracts the audio to mp3 format.',
        },
      ],
      loop: false,
    }),
    url: await input({
      message: 'Enter the URL',
      validate: ((v) => YoutubeDownloaderValidations.isURLValid(v)),
    }),
  };

  // execute the apropriate action
  switch (answers.action) {
    case 'download_video': {
      const fileName = await YouTubeDownloaderService.downloadVideo(answers.url);
      Utilities.print('YoutubeDownloader.downloadVideo', [
        'Downloaded Video:',
        fileName,
      ], true);
      break;
    }
    case 'download_audio': {
      const fileName = await YouTubeDownloaderService.downloadAudio(answers.url);
      Utilities.print('YoutubeDownloader.downloadAudio', [
        'Downloaded Audio:',
        fileName,
      ], true);
      break;
    }
    default:
      throw new Error('The selected action is invalid');
  }
}
