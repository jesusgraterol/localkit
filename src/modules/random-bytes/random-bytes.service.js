import { randomBytes } from 'node:crypto';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Generates a random sequence of bytes and encodes the result with the Base64URL scheme.
 * @param {*} size
 * @returns string
 */
const generate = (size) => randomBytes(size).toString('base64url');

/**
 * Verifies if the given secret is a sequence of random bytes encoded with the Base64URL scheme.
 * @param {*} secret
 * @returns boolean
 */
const validate = (secret) => /^[a-zA-Z0-9-_]{6,}$/.test(secret);

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export { generate, validate };
