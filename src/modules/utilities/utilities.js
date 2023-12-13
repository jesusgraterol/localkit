import { format } from 'date-fns';

/**
 * Utilities
 * Provides commonly used functionality in order to main consistency across modules.
 */
class Utilities {
  /**
   * Outputs the given content to the terminal.
   * @param {*} title
   * @param {*} content
   * @param {?} includeBorders
   * @param {?} includeDate
   */
  static print(title, content, includeBorders = true, includeDate = false) {
    if (includeBorders) console.log('\n========================================\n');
    console.log(`${title}`);
    if (includeDate) console.log(`${format(new Date(), 'dd/MM/yyyy HH:MM a')}`);
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
}




/**
 * Module Exports
 */
export default Utilities;
