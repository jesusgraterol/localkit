import { format } from 'date-fns';

/**
 * Utilities
 * Provides commonly used functionality in order to main consistency across modules.
 */
class Utilities {
  /* **************
   * MISC HELPERS *
   ************** */

  /**
   * Outputs the given content to the terminal.
   * @param {*} title
   * @param {*} content
   * @param {?} includeDate
   * @param {?} includeBorders
   */
  static print(title, content, includeDate = false, includeBorders = true) {
    if (includeBorders) console.log('\n========================================\n');
    console.log(`${title}`);
    if (includeDate) console.log(Utilities.formatDate());
    console.log('\n');
    if (typeof content === 'string') {
      console.log(content);
    } else if (Array.isArray(content)) {
      content.forEach((item) => {
        console.log(item);
      });
    } else {
      throw new Error('The content must be a string or a string array.');
    }
    if (includeBorders) console.log('\n========================================');
  }





  /**
   * Formats a timestamp or the current time if none is provided.
   * @param {?} timestamp
   * @param {?} dateFormat
   * @returns string
   */
  static formatDate(timestamp = undefined, dateFormat = 'dd/MM/yyyy, hh:mm:ss a') {
    return format(typeof timestamp === 'number' ? new Date(timestamp) : new Date(), dateFormat);
  }




  /**
   * Creates a delay which duration is based on the amount of provided seconds.
   * @returns Promise<void>
   */
  static delay(seconds) {
    return new Promise((resolve) => { setTimeout(resolve, seconds * 1000); });
  }
}




/**
 * Module Exports
 */
export default Utilities;
