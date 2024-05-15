import select from '@inquirer/select';
import { input } from '@inquirer/prompts';
import { print } from '../shared/utilities/utilities.js';
import { isURLValid } from './youtube-downloader.validations.js';
import { downloadVideo, downloadAudio } from './youtube-downloader.service.js';

/* ************************************************************************************************
 *                                        MODULE LAUNCHER                                         *
 ************************************************************************************************ */
export default async function launcher() {
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
      validate: ((v) => isURLValid(v)),
    }),
  };

  // execute the apropriate action
  switch (answers.action) {
    case 'download_video': {
      const fileName = await downloadVideo(answers.url);
      print('YoutubeDownloader.downloadVideo', [
        'Downloaded Video:',
        fileName,
      ], true);
      break;
    }
    case 'download_audio': {
      const fileName = await downloadAudio(answers.url);
      print('YoutubeDownloader.downloadAudio', [
        'Downloaded Audio:',
        fileName,
      ], true);
      break;
    }
    default:
      throw new Error('The selected action is invalid');
  }
}
