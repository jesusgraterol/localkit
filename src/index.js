import select, { Separator } from '@inquirer/select';
import { exec } from 'child_process';

/**
 * Module Menu
 */
const answer = await select({
  message: 'Select a package manager',
  choices: [
    {
      name: 'npm',
      value: 'npm',
      description: 'npm is the most popular package manager',
    },
    {
      name: 'UUID',
      value: 'uuid',
      description: 'Universally Unique Identifier Management',
    },
    new Separator(),
    {
      name: 'jspm',
      value: 'jspm',
      disabled: true,
    },
    {
      name: 'pnpm',
      value: 'pnpm',
      disabled: '(pnpm is not available)',
    },
  ],
});





/**
 * Module Execution
 */
exec(`node ./src/modules/${answer}/index.js`, (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  // the *entire* stdout (buffered)
  console.log(stdout);
});
