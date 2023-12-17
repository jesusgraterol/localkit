import select from '@inquirer/select';
import passwordModuleLauncher from './modules/password/launcher.js';
import uuidModuleLauncher from './modules/uuid/launcher.js';
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
console.log('LOCALKIT\n');
const answer = await select({
  message: 'Select a module',
  choices: MODULES.map((module) => ({
    name: module.name,
    value: module.value,
    description: module.description,
    disabled: module.launcher === undefined ? '@TODO' : false,
  })),
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
