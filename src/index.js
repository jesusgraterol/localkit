#! /usr/bin/env node
import select from '@inquirer/select';
import { buildCLIHeader } from './modules/shared/utilities/utilities.js';

/* ************************************************************************************************
 *                                        MODULE LAUNCHERS                                        *
 ************************************************************************************************ */
import passwordModuleLauncher from './modules/password/launcher.js';
import randomBytesLauncher from './modules/random-bytes/launcher.js';
import uuidModuleLauncher from './modules/uuid/launcher.js';
import otpModuleLauncher from './modules/otp/launcher.js';
import aes256ModuleLauncher from './modules/aes256/launcher.js';
import md5ModuleLauncher from './modules/md5/launcher.js';
import faviconBuilderModuleLauncher from './modules/favicon-builder/launcher.js';
import pwaAssetsBuilderModuleLauncher from './modules/pwa-assets-builder/launcher.js';
import materialIconsLauncher from './modules/material-icons/launcher.js';

const MODULES = [
  {
    name: 'Password',
    value: 'password',
    description: 'Generate and analyze passwords',
    launcher: passwordModuleLauncher,
  },
  {
    name: 'Random Bytes',
    value: 'random_bytes',
    description: 'Generate a sequence of random bytes',
    launcher: randomBytesLauncher,
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
    name: 'Material Icons',
    value: 'material_icons',
    description: 'Download and install Material Icons in your web app',
    launcher: materialIconsLauncher,
  },
];

/* ************************************************************************************************
 *                                         INPUT HANDLER                                          *
 ************************************************************************************************ */
console.log(buildCLIHeader());
const answer = await select({
  message: 'Select a module',
  choices: MODULES.map((module) => ({
    name: module.name,
    value: module.value,
    description: module.description,
    disabled: module.launcher === undefined ? '@TODO' : false,
  })),
  pageSize: 100,
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
