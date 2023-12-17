import aes256 from 'aes256';

/**
 * AES256 Service
 * Service in charge of encrypting and decrypting messages by making use of the aes256 algorithm.
 * Note this class makes use of the following lib to simplify the implementation:
 * https://github.com/JamesMGreene/node-aes256
 */
class AES256Service {
  /**
   * Encrypts a given message based on the provided password and returns the encripted value.
   * @param {*} password
   * @param {*} message
   * @returns string
   */
  static encrypt(password, message) {
    // encrypt the message
    const encryptedMessage = aes256.encrypt(password, message);

    // ensure the message can be properly decrypted
    const decryptedMessage = AES256Service.decrypt(password, encryptedMessage);
    if (message !== decryptedMessage) {
      throw new Error(`The message was encrypted but did not pass the verification: ${message} != ${decryptedMessage}`);
    }

    // finally, return the encrypted message
    return encryptedMessage;
  }

  /**
   * Attempts to decrypt a given message.
   * @param {*} password
   * @param {*} encryptedMessage
   * @returns string
   */
  static decrypt(password, encryptedMessage) {
    return aes256.decrypt(password, encryptedMessage);
  }
}




/**
 * Module Exports
 */
export default AES256Service;
