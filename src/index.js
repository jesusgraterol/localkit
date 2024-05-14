#! /usr/bin/env node
import select from '@inquirer/select';
import { buildCLIHeader } from './modules/shared/utilities/utilities.js';
import { readPackageFile } from './modules/shared/file-system/file-system.service.js';

/* ************************************************************************************************
 *                                        MODULE LAUNCHERS                                        *
 ************************************************************************************************ */
import passwordModuleLauncher from './modules/password/launcher.js';
import uuidModuleLauncher from './modules/uuid/launcher.js';
import otpModuleLauncher from './modules/otp/launcher.js';
import youtubeDownloaderModuleLauncher from './modules/youtube-downloader/launcher.js';
import faviconBuilderModuleLauncher from './modules/favicon-builder/launcher.js';
import pwaAssetsBuilderModuleLauncher from './modules/pwa-assets-builder/launcher.js';
import aes256ModuleLauncher from './modules/aes256/launcher.js';
import md5ModuleLauncher from './modules/md5/launcher.js';

const MODULES = [
  {
    name: 'Password',
    value: 'password',
    description: 'Generate and analyze passwords',
    launcher: passwordModuleLauncher,
  },
  {
    name: 'UUID',
    value: 'uuid',
    description: 'Generate and validate UUIDs (Universally Unique Identifiers)',
    launcher: uuidModuleLauncher,
  },
  {
    name: 'OTP',
    value: 'otp',
    description: 'Generate OTP (One Time Password) secrets and tokens',
    launcher: otpModuleLauncher,
  },
  {
    name: 'YouTube Downloader',
    value: 'youtube_downloader',
    description: 'Gownload videos/audio files from YouTube',
    launcher: youtubeDownloaderModuleLauncher,
  },
  {
    name: 'Favicon Builder',
    value: 'favicon_builder',
    description: 'Build all the favicon files required by modern web apps',
    launcher: faviconBuilderModuleLauncher,
  },
  {
    name: 'PWA Assets Builder',
    value: 'pwa_assets_builder',
    description: 'Build all the images required for a PWA to be published',
    launcher: pwaAssetsBuilderModuleLauncher,
  },
  {
    name: 'AES256',
    value: 'aes256',
    description: 'Encrypt and decrypt messages with the AES256 algorithm',
    launcher: aes256ModuleLauncher,
  },
  {
    name: 'MD5',
    value: 'md5',
    description: 'Hash and validate messages with the MD5 Algorithm',
    launcher: md5ModuleLauncher,
  },
];





/* ************************************************************************************************
 *                                         INPUT HANDLER                                          *
 ************************************************************************************************ */
const packageFile = await readPackageFile();
console.log(buildCLIHeader(packageFile?.version));
const answer = await select({
  message: 'Select a module',
  choices: MODULES.map((module) => ({
    name: module.name,
    value: module.value,
    description: module.description,
    disabled: module.launcher === undefined ? '@TODO' : false,
  })),
  loop: false,
});





/* ************************************************************************************************
 *                                           EXECUTION                                            *
 ************************************************************************************************ */
try {
  const module = MODULES.find((mod) => mod.value === answer);
  await module.launcher();
  process.exit(0);
} catch (e) {
  console.error(e);
  process.exit(1);
}
