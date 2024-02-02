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
 * - step: number -> The time step in seconds. The Google Authenticator implementation rotates
 * tokens every 30 seconds.
 */
authenticator.options = { window: 2, step: 30 };





/**
 * OTP Service Factory
 * Service in charge of generating OTP Secrets and tokens. The lib used to simplify the process is:
 * https://github.com/JamesMGreene/node-aes256
 */
const otpServiceFactory = () => {
  /* *******************
   * SECRET MANAGEMENT *
   ******************* */

  /**
   * Generates a secret that can be used to initialize an OTP instance and generate tokens.
   * @returns string
   */
  const generateSecret = () => authenticator.generateSecret();

  /**
   * Validates the format of a given OTP secret.
   * @param {*} secret
   * @returns boolean
   */
  const isSecretFormatValid = (secret) => typeof secret === 'string' && /^[0-9a-zA-Z]{16,64}$/.test(secret);




  /* ******************
   * TOKEN MANAGEMENT *
   ****************** */

  /**
   * Generates an OTP token based on given secret.
   * @param {*} secret
   * @returns string
   */
  const generateToken = (secret) => authenticator.generate(secret);

  /**
   * Validates the format of a given token. IMPORTANT: it does not check the validity based on the
   * secret.
   * @param {*} token
   * @returns boolean
   */
  const isTokenFormatValid = (token) => typeof token === 'string' && /^[0-9]{6}$/.test(token);





  /* **************
   * MODULE BUILD *
   ************** */
  return Object.freeze({
    // secret management
    generateSecret,
    isSecretFormatValid,

    // token management
    generateToken,
    isTokenFormatValid,
  });
};




/**
 * Global Instance
 */
const OTPService = otpServiceFactory();





/**
 * Module Exports
 */
export default OTPService;
