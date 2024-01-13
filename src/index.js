#! /usr/bin/env node
import select from '@inquirer/select';
import FileSystemService from './modules/shared/file-system/file-system.service.js';
import Utilities from './modules/shared/utilities/utilities.js';
import passwordModuleLauncher from './modules/password/launcher.js';
import uuidModuleLauncher from './modules/uuid/launcher.js';
import otpModuleLauncher from './modules/otp/launcher.js';
import youtubeDownloaderModuleLauncher from './modules/youtube-downloader/launcher.js';
import faviconBuilderModuleLauncher from './modules/favicon-builder/launcher.js';
import aes256ModuleLauncher from './modules/aes256/launcher.js';
import md5ModuleLauncher from './modules/md5/launcher.js';

/**
 * Module List
 */
const MODULES = [
  {
    name: 'Password',
    value: 'password',
    description: 'Generation and analysis of account passwords',
    launcher: passwordModuleLauncher,
  },
  {
    name: 'UUID',
    value: 'uuid',
    description: 'Generation and validation of Universally Unique Identifiers',
    launcher: uuidModuleLauncher,
  },
  {
    name: 'OTP',
    value: 'otp',
    description: 'One Time Password Generation and verification',
    launcher: otpModuleLauncher,
  },
  {
    name: 'YouTube Downloader',
    value: 'youtube_downloader',
    description: 'Download videos and/or audio files from YouTube',
    launcher: youtubeDownloaderModuleLauncher,
  },
  {
    name: 'Favicon Builder',
    value: 'favicon_builder',
    description: 'Build all the favicon files required by modern web apps',
    launcher: faviconBuilderModuleLauncher,
  },
  {
    name: 'AES256',
    value: 'aes256',
    description: 'Encryption and Decryption of messages with the aes256-ctr algorithm',
    launcher: aes256ModuleLauncher,
  },
  {
    name: 'MD5',
    value: 'md5',
    description: 'Message-Digest Algorithm Hashing',
    launcher: md5ModuleLauncher,
  },
];





/**
 * Module Menu
 */
const packageFile = await FileSystemService.readPackageFile();
console.log(Utilities.buildCLIHeader(packageFile?.version));
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





/**
 * Module Execution
 * Retrieve the module based on the user's selection and execute the launcher.
 */
try {
  const module = MODULES.find((mod) => mod.value === answer);
  await module.launcher();
  process.exit(0);
} catch (e) {
  console.error(e);
  process.exit(1);
}
