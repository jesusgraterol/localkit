import fs from 'fs';
import pathHelper from 'path';

/**
 * File System Service
 * Service in charge of simplifying the interaction with files and directories.
 * IMPORTANT: this module could've been written using the synchronous API. However, since these
 * actions are commonly used across projects, the asynchronous API was used instead so the methods
 * can be easily transported to any NodeJS Server.
 */
class FileSystemService {
  /* ************
   * PROPERTIES *
   ************ */

  // the list of possible paths in which the package.json file can be found
  static #PACKAGE_FILE_PATHS = [
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
  static pathExists(path) {
    return new Promise((resolve) => {
      fs.access(path, (error) => {
        // If there is an error, means the path doesnt exist. Otherwise, it does
        resolve(error === null);
      });
    });
  }

  /**
   * Reads all the contents for a given path and separates them into directories and files.
   * @param {*} path
   * @param {?} includeExtensions
   * @returns Promise<{directories: IPathItem[], files: IPathItem[]}[]>
   */
  static readPathContent(path, includeExtensions = []) {
    return new Promise((resolve, reject) => {
      fs.readdir(path, async (error, content) => {
        if (error) reject(error);

        // init the content lists
        const directories = [];
        const files = [];

        // read the contents and apply the file filter (if provided)
        const items = await Promise.all(content.map(
          (contentItem) => FileSystemService.#buildPathItem(`${path}/${contentItem}`),
        ));
        items.forEach((item) => {
          if (!item.isFile) {
            directories.push(item);
          } else if (!includeExtensions.length || includeExtensions.includes(item.ext)) {
            files.push(item);
          }
        });

        // finally, sort the items alphabetically and resolve them
        files.sort(FileSystemService.#sortByName);
        directories.sort(FileSystemService.#sortByName);
        resolve({ directories, files });
      });
    });
  }

  /**
   * Builds an item object based on a given path.
   * @param {*} path
   * @returns Promise<IPathItem>
   */
  static #buildPathItem(path) {
    return new Promise((resolve, reject) => {
      fs.lstat(path, (error, stats) => {
        if (error) reject(error);
        resolve({
          path,
          baseName: pathHelper.basename(path),
          ext: pathHelper.extname(path),
          isFile: stats.isFile(),
          creation: Math.round(stats.birthtimeMs),
        });
      });
    });
  }

  /**
   * Sort function used to organize files by name alphabetically.
   * @param {*} a
   * @param {*} b
   * @returns number
   */
  static #sortByName(a, b) {
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
  }





  /* **********************
   * DIRECTORY MANAGEMENT *
   ********************** */

  /**
   * Creates a directory at a given path. Note that if the directory exists, it will delete all
   * its contents and create a brand new one.
   * @param {*} path
   * @returns Promise<void>
   */
  static async makeDirectory(path) {
    // if the directory exists, delete it first
    const pathExists = await this.pathExists(path);
    if (pathExists) await FileSystemService.deleteDirectory(path);

    // create the directory
    return new Promise((resolve, reject) => {
      fs.mkdir(path, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  /**
   * Deletes a directory and its contents based on the provided path.
   * @param {*} path
   * @returns Promise<void>
   */
  static deleteDirectory(path) {
    return new Promise((resolve, reject) => {
      fs.rm(path, { force: true, recursive: true }, (error) => {
        if (error) reject(error);
        resolve();
      });
    });
  }




  /* *****************
   * FILE MANAGEMENT *
   ***************** */

  /**
   * Writes a file to a given path. Note that if the file is json and the data is an object,
   * it will be stringified prior to saving it.
   * @param {*} filePath
   * @param {*} data
   * @returns Promise<void>
   * @TODO Stringify the file contents if it is a JSON and the data is an object
   */
  static writeFile(filePath, data) {
    // init the file extension
    const ext = pathHelper.extname(filePath);

    // if it is a json file and the provided data is an object, stringify it. Otherwise, leave it
    const content = ext === '.json' && typeof data === 'object' ? JSON.stringify(data) : data;

    // write the file to disk
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, content, 'utf-8', (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  /**
   * Reads a file and returns its contents. Note that if the file is JSON, it will attempt to parse
   * it and return the object instead of a raw string.
   * @param {*} filePath
   * @returns Promise<string|object>
   * @TODO Parse the file contents if it is a JSON
   */
  static async readFile(filePath) {
    // ensure the file exists
    const exists = await FileSystemService.pathExists(filePath);
    if (!exists) {
      throw new Error(`The file ${filePath} does not exist.`);
    }

    // init the file extension
    const ext = pathHelper.extname(filePath);

    // read it and return its contents
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) reject(err);

        // init the file's content and parse it if it is JSON. Otherwise, return it as is
        const content = data.toString();
        resolve(ext === '.json' ? JSON.parse(content) : content);
      });
    });
  }

  /**
   * Deletes a file located at the given path.
   * @param {*} path
   * @returns Promise<void>
   */
  static deleteFile(path) {
    return new Promise((resolve, reject) => {
      fs.unlink(path, (error) => {
        if (error) reject(error);
        resolve();
      });
    });
  }

  /**
   * Copies a file from the origin to the destination.
   * @param {*} originPath
   * @param {*} destinationPath
   * @returns Promise<void>
   */
  static copyFile(originPath, destinationPath) {
    return new Promise((resolve, reject) => {
      fs.copyFile(originPath, destinationPath, (error) => {
        if (error) reject(error);
        resolve();
      });
    });
  }




  /* **************
   * MISC HELPERS *
   ************** */

  /**
   * Attempts to read the package file resursively. If it is unable to do so, it returns undefined.
   * @param {*} nextIndex
   * @returns Promise<string|undefined>
   */
  static async readPackageFile(nextIndex = 0) {
    // declare the base case
    if (nextIndex === FileSystemService.#PACKAGE_FILE_PATHS.length) {
      return undefined;
    }

    // attempt to read the file
    try {
      return await FileSystemService.readFile(FileSystemService.#PACKAGE_FILE_PATHS[nextIndex]);
    } catch (e) {
      return FileSystemService.readPackageFile(nextIndex + 1);
    }
  }
}




/**
 * Module Exports
 */
export default FileSystemService;
