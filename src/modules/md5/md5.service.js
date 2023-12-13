import md5 from 'md5';

/**
 * MD5 Service
 * Service in charge of managing md5 (Message-Digest Algorithm) Hashes.
 */
class MD5Service {
  /**
   * Creates a md5 hash from a given message.
   * @returns string
   */
  static hash(message) {
    return md5(message);
  }

  /**
   * Ensures the provided value is a valid md5 hash.
   * @param {*} hash
   * @returns boolean
   */
  static validate(hash) {
    return /^[a-f0-9]{32}$/gi.test(hash);
  }
}




/**
 * Module Exports
 */
export default MD5Service;
