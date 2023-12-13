import select from '@inquirer/select';
import uuidModuleLauncher from './modules/uuid/launcher.js';
import md5ModuleLauncher from './modules/md5/launcher.js';

/**
 * Module List
 */
const MODULES = [
  {
    name: 'Password',
    value: 'password',
    description: 'Generation and analysis of strong passwords',
    launcher: undefined,
    disabled: '@TODO',
  },
  {
    name: 'UUID',
    value: 'uuid',
    description: 'Generation and validation of Universally Unique Identifiers',
    launcher: uuidModuleLauncher,
    disabled: '',
  },
  {
    name: 'MD5',
    value: 'md5',
    description: 'Message-Digest Algorithm',
    launcher: md5ModuleLauncher,
    disabled: '',
  },
];





/**
 * Module Menu
 */
const answer = await select({
  message: 'Select a module',
  choices: MODULES.map((module) => ({
    name: module.name,
    value: module.value,
    description: module.description,
    disabled: module.disabled,
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
