import {
  v4 as uuidv4,
  version as uuidVersion,
  validate as uuidValidate,
} from 'uuid';

/**
 * UUID Service
 * Service in charge of managing Universally Unique Identifiers.
 */
class UUIDService {
  /**
   * Creates an RFC version 4 (random) UUID.
   * @returns string
   */
  static generate() {
    return uuidv4();
  }


  /**
   * Ensures the provided value is a valid uuid and that is version 4.
   * @param {*} uuid
   * @returns boolean
   */
  static validate(uuid) {
    return uuidValidate(uuid) && uuidVersion(uuid) === 4;
  }
}




/**
 * Module Exports
 */
export default UUIDService;
