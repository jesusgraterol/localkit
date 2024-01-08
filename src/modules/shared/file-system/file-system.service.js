import fs from 'fs';
// import pathHelper from 'path';

/**
 * File System Service
 * Service in charge of simplifying the interaction with files and directories.
 */
class FileSystemService {
  /**
   * Verifies if a given path exists (file or directory).
   * @param {*} path
   * @returns Promise<boolean>
   */
  static pathExists(path) {
    return new Promise((resolve) => {
      fs.access(path, (error) => {
        // If there is an error, means the path doesnt exist. Otherwise, it does
        resolve(error !== null);
      });
    });
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
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, data, 'utf-8', (err) => {
        // Handle errors
        if (err) reject(err);

        // Resolve the promise
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

    // read it and return its contents
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        // Handle errors
        if (err) reject(err);

        // Resolve the promise
        resolve(data.toString());
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
}




/**
 * Module Exports
 */
export default FileSystemService;
