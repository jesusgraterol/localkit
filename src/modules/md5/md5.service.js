import md5 from 'md5';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

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

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export { hash, validate };
