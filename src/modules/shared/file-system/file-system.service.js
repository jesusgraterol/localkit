import fs from 'fs';
import pathHelper from 'path';

/**
 * File System Service Factory
 * Service in charge of simplifying the interaction with files and directories.
 * IMPORTANT: this module could've been written using the synchronous API. However, since these
 * actions are commonly used across projects, the asynchronous API was used instead so the methods
 * can be easily transported to any NodeJS Server.
 */
const fileSystemServiceFactory = () => {
  /* ************
   * PROPERTIES *
   ************ */

  // the list of possible paths in which the package.json file can be found
  const __PACKAGE_FILE_PATHS = [
    '/usr/local/lib/node_modules/localkit/package.json',
  ];





  /* ********************
   * GENERAL MANAGEMENT *
   ******************** */

  /**
   * Verifies if a given path exists (file or directory).
   * @param {*} path
   * @returns Promise<boolean>
   */
  const pathExists = (path) => new Promise((resolve) => {
    fs.access(path, (error) => {
      // If there is an error, means the path doesnt exist. Otherwise, it does
      resolve(error === null);
    });
  });

  /**
   * Builds an item object based on a given path.
   * @param {*} path
   * @returns Promise<IPathItem>
   */
  const __buildPathItem = (path) => new Promise((resolve, reject) => {
    fs.lstat(path, (error, stats) => {
      if (error) {
        reject(error);
      } else {
        resolve({
          path,
          baseName: pathHelper.basename(path),
          ext: pathHelper.extname(path),
          isFile: stats.isFile(),
          creation: Math.round(stats.birthtimeMs),
        });
      }
    });
  });

  /**
   * Sort function used to organize files by name alphabetically.
   * @param {*} a
   * @param {*} b
   * @returns number
   */
  const __sortByName = (a, b) => {
    const nameA = a.baseName.toUpperCase(); // ignore upper and lowercase
    const nameB = b.baseName.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  };

  /**
   * Reads all the contents for a given path and separates them into directories and files.
   * Note: if the includeExtensions filter is provided, ensure the extensions are lowercase.
   * @param {*} path
   * @param {?} includeExtensions
   * @returns Promise<{directories: IPathItem[], files: IPathItem[]}[]>
   */
  const readPathContent = (path, includeExtensions = []) => new Promise((resolve, reject) => {
    fs.readdir(path, async (error, content) => {
      if (error) {
        reject(error);
      } else {
        // init the content lists
        const directories = [];
        const files = [];

        // read the contents and apply the file filter (if provided)
        const items = await Promise.all(content.map(
          (contentItem) => __buildPathItem(`${path}/${contentItem}`),
        ));
        items.forEach((item) => {
          if (!item.isFile) {
            directories.push(item);
          } else if (
            !includeExtensions.length
            || includeExtensions.includes(item.ext.toLowerCase())
          ) {
            files.push(item);
          }
        });

        // finally, sort the items alphabetically and resolve them
        files.sort(__sortByName);
        directories.sort(__sortByName);
        resolve({ directories, files });
      }
    });
  });





  /* **********************
   * DIRECTORY MANAGEMENT *
   ********************** */

  /**
   * Deletes a directory and its contents based on the provided path.
   * @param {*} path
   * @returns Promise<void>
   */
  const deleteDirectory = (path) => new Promise((resolve, reject) => {
    fs.rm(path, { force: true, recursive: true }, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });

  /**
   * Creates a directory at a given path. Note that if the directory exists, it will delete all
   * its contents and create a brand new one.
   * @param {*} path
   * @returns Promise<void>
   */
  const makeDirectory = async (path) => {
    // if the directory exists, delete it first
    if (await pathExists(path)) await deleteDirectory(path);

    // create the directory
    return new Promise((resolve, reject) => {
      fs.mkdir(path, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };




  /* *****************
   * FILE MANAGEMENT *
   ***************** */

  /**
   * Writes a file to a given path. Note that if the file is json and the data is an object,
   * it will be stringified prior to saving it.
   * @param {*} filePath
   * @param {*} data
   * @param {?} options
   * @returns Promise<void>
   */
  const writeFile = (filePath, data, options = {}) => {
    // if it is a json file and the provided data is an object, stringify it. Otherwise, leave it
    const content = pathHelper.extname(filePath) === '.json' && typeof data === 'object'
      ? JSON.stringify(data)
      : data;

    // create a local copy of the options
    const opts = { ...options };

    // if the data is not a Buffer, set the encoding standard to be used
    if (!Buffer.isBuffer(content)) {
      opts.encoding = 'utf-8';
    }

    // write the file to disk
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, content, opts, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  /**
   * Reads a file and returns its contents. Note that if the file is JSON, it will attempt to parse
   * it and return the object instead of a raw string.
   * @param {*} filePath
   * @returns Promise<string|object>
   */
  const readFile = async (filePath) => {
    // ensure the file exists
    if (!await pathExists(filePath)) throw new Error(`The file ${filePath} does not exist.`);

    // read it and return its contents
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
        } else {
          // init the file's content and parse it if it is JSON. Otherwise, return it as is
          const content = data.toString();
          resolve(pathHelper.extname(filePath) === '.json' ? JSON.parse(content) : content);
        }
      });
    });
  };

  /**
   * Deletes a file located at the given path.
   * @param {*} path
   * @returns Promise<void>
   */
  const deleteFile = (path) => new Promise((resolve, reject) => {
    fs.unlink(path, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });

  /**
   * Copies a file from the origin to the destination.
   * @param {*} originPath
   * @param {*} destinationPath
   * @returns Promise<void>
   */
  const copyFile = (originPath, destinationPath) => new Promise((resolve, reject) => {
    fs.copyFile(originPath, destinationPath, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });




  /* **************
   * MISC HELPERS *
   ************** */

  /**
   * Attempts to read the package file resursively. If it is unable to do so, it returns undefined.
   * @param {*} nextIndex
   * @returns Promise<string|undefined>
   */
  const readPackageFile = async (nextIndex = 0) => {
    // declare the base case
    if (nextIndex === __PACKAGE_FILE_PATHS.length) {
      return undefined;
    }

    // attempt to read the file
    try {
      return await readFile(__PACKAGE_FILE_PATHS[nextIndex]);
    } catch (e) {
      return readPackageFile(nextIndex + 1);
    }
  };





  /* **************
   * MODULE BUILD *
   ************** */
  return Object.freeze({
    // general management
    pathExists,
    readPathContent,

    // directory management
    deleteDirectory,
    makeDirectory,

    // file management
    writeFile,
    readFile,
    deleteFile,
    copyFile,

    // misc helpers
    readPackageFile,
  });
};




/**
 * Global Instance
 */
const FileSystemService = fileSystemServiceFactory();





/**
 * Module Exports
 */
export default FileSystemService;
