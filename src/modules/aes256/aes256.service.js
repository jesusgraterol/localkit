import aes256 from 'aes256';

/**
 * AES256 Service Factory
 * Service in charge of encrypting and decrypting messages by making use of the aes256 algorithm.
 * Note this class makes use of the following lib to simplify the implementation:
 * https://github.com/JamesMGreene/node-aes256
 * IMPORTANT: the symmetric session key (a.k.a. secret, a.k.a. passphrase) can be of any size
 * because it is hashed using SHA-256.
 */
const aes256ServiceFactory = () => {
  /**
   * Attempts to decrypt a given message.
   * @param {*} password
   * @param {*} encryptedMessage
   * @returns string
   */
  const decrypt = (password, encryptedMessage) => aes256.decrypt(password, encryptedMessage);

  /**
   * Encrypts a given message based on the provided password and returns the encripted value.
   * @param {*} password
   * @param {*} message
   * @returns string
   */
  const encrypt = (password, message) => {
    // encrypt the message
    const encryptedMessage = aes256.encrypt(password, message);

    // ensure the message can be properly decrypted
    const decryptedMessage = decrypt(password, encryptedMessage);
    if (message !== decryptedMessage) {
      throw new Error(`The message was encrypted but did not pass the verification: ${message} != ${decryptedMessage}`);
    }

    // finally, return the encrypted message
    return encryptedMessage;
  };




  /* **************
   * MODULE BUILD *
   ************** */
  return Object.freeze({
    decrypt,
    encrypt,
  });
};




/**
 * Global Instance
 */
const AES256Service = aes256ServiceFactory();





/**
 * Module Exports
 */
export default AES256Service;
