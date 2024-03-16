import { jest } from '@jest/globals';
import fs from 'fs';
import pathHelper from 'path';



/**
 * Spy Factories
 */
const accessSpyFactory = (cbReturnVal) => jest.spyOn(fs, 'access').mockImplementation(
  (path, callback) => callback(cbReturnVal),
);

const lstatSpyFactory = (cbReturnVals) => {
  const mock = jest.spyOn(fs, 'lstat');
  cbReturnVals.forEach(
    (cbVal) => mock.mockImplementationOnce((path, callback) => callback(null, cbVal)),
  );
  return mock;
};

const readdirSpyFactory = (
  cbReturnError,
  cbReturnVal = undefined,
) => jest.spyOn(fs, 'readdir').mockImplementation(
  (path, callback) => callback(cbReturnError, cbReturnVal),
);

const rmSpyFactory = (cbReturnError) => jest.spyOn(fs, 'rm').mockImplementation(
  (path, options, callback) => callback(cbReturnError),
);

const mkdirSpyFactory = (cbReturnVal) => jest.spyOn(fs, 'mkdir').mockImplementation(
  (path, callback) => callback(cbReturnVal),
);

const writeFileSpyFactory = (cbReturnVal) => jest.spyOn(fs, 'writeFile').mockImplementation(
  (path, content, options, callback) => callback(cbReturnVal),
);

const readFileSpyFactory = (
  cbReturnErr,
  cbReturnVal = undefined,
) => jest.spyOn(fs, 'readFile').mockImplementation(
  (path, callback) => callback(cbReturnErr, cbReturnVal),
);



/**
 * Misc Test Helpers
 */
const buildFileSystemElement = (path, isFile, creation) => ({
  path,
  baseName: pathHelper.basename(path),
  ext: pathHelper.extname(path),
  isFile,
  creation,
});

const validateSpyInteractions = (
  expectFunc,
  spyFunc,
  calledTimes,
  callArgs = [],
  clearMock = true,
) => {
  expectFunc(spyFunc).toHaveBeenCalledTimes(calledTimes);

  // if the spy was invoked with arguments, ensure the correct ones were used.
  // additionally, if a single func was invoked with multiple arguments, iterate over the inner args
  // and evaluate them independently
  if (calledTimes > 0 && Array.isArray(callArgs) && callArgs.length) {
    callArgs.forEach((arg, index) => {
      if (Array.isArray(arg)) {
        arg.forEach((innerArg, innerIndex) => {
          expectFunc(spyFunc.mock.calls[index][innerIndex]).toStrictEqual(innerArg);
        });
      } else {
        expectFunc(spyFunc.mock.calls[index][0]).toStrictEqual(arg);
      }
    });
  }
  if (clearMock) spyFunc.mockClear();
};




/**
 * Module Exports
 */
export {
  // spy factories
  accessSpyFactory,
  lstatSpyFactory,
  readdirSpyFactory,
  rmSpyFactory,
  mkdirSpyFactory,
  writeFileSpyFactory,
  readFileSpyFactory,

  // misc test helpers
  buildFileSystemElement,
  validateSpyInteractions,
};
