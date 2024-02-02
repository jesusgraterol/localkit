import md5 from 'md5';

/**
 * MD5 Service Factory
 * Service in charge of managing md5 (Message-Digest Algorithm) Hashes.
 */
const mdtServiceFactory = () => {
  /**
   * Creates a md5 hash from a given message.
   * @returns string
   */
  const hash = (message) => md5(message);

  /**
   * Ensures the provided value is a valid md5 hash.
   * @param {*} hashString
   * @returns boolean
   */
  const validate = (hashString) => /^[a-f0-9]{32}$/gi.test(hashString);





  /* **************
   * MODULE BUILD *
   ************** */
  return Object.freeze({
    hash,
    validate,
  });
};




/**
 * Global Instance
 */
const MD5Service = mdtServiceFactory();




/**
 * Module Exports
 */
export default MD5Service;
