import { authenticator } from 'otplib';




/**
 * Authenticator Options
 * All the available options can be found in the following URL:
 * https://github.com/yeojz/otplib/blob/master/README.md#available-options
 *
 * - window: number|[number, number] -> Tokens in the previous and future x-windows that should be
 * considered valid. If integer, same value will be used for both or use Tuple: [past, future]
 * The reason this property was set to 2 is because it's bad for UX when the user tries to use a
 * token right after it expires. By setting the accepted window to 2, the UX is improved and the
 * impact on security is low as it only extends the token's validity by ~1 minute for past tokens
 * and 1 minute for future tokens, instead of 30 seconds (default).
 */
authenticator.options = { window: 2 };





/**
 * OTP Service
 * Service in charge of generating OTP Secrets and tokens. The lib used to simplify the process is:
 * https://github.com/JamesMGreene/node-aes256
 */
class OTPService {
  /* *******************
   * SECRET MANAGEMENT *
   ******************* */

  /**
   * Generates a secret that can be used to initialize an OTP instance and generate tokens.
   * @returns string
   */
  static generateSecret() {
    return '';
  }


  /**
   * Validates a given OTP secret.
   * @param {*} secret
   * @returns boolean
   */
  static isSecretValid(secret) {
    return secret === '';
  }




  /* ******************
   * TOKEN MANAGEMENT *
   ****************** */

  /**
   * Generates an OTP token based on given secret.
   * @param {*} secret
   * @returns string
   */
  static generateToken(secret) {
    return secret;
  }

  /**
   * Validates the format of a given token.
   * @param {*} token
   * @returns boolean
   */
  static isTokenValid(token) {
    return token === '';
  }
}




/**
 * Module Exports
 */
export default OTPService;
