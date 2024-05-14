import {
  v4 as uuidv4,
  version as uuidVersion,
  validate as uuidValidate,
} from 'uuid';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Creates an RFC version 4 (random) UUID.
 * @returns string
 */
const generate = () => uuidv4();


/**
 * Ensures the provided value is a valid uuid and that is version 4.
 * @param {*} uuid
 * @returns boolean
 */
const validate = (uuid) => uuidValidate(uuid) && uuidVersion(uuid) === 4;





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  generate,
  validate,
};
