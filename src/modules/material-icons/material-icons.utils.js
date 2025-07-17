import { join } from 'node:path';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Builds the content that will be inserted into the stylesheet that imports the icons.
 * @param {*} iconsFileName
 * @param {*} filled
 * @returns string
 */
const buildStyleSheet = (
  iconsFileName,
  filled,
) => `/* ************************************************************************************************
*                                           FONT FACE                                            *
************************************************************************************************ */
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(${iconsFileName}) format('woff2');
}\n\n\n\n\n
/* ************************************************************************************************
 *                                           BASE CLASS                                           *
 ************************************************************************************************ */
.md-icon {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;${filled ? "\n  font-variation-settings: 'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 48;" : ''}
}\n\n\n\n\n
/* ************************************************************************************************
 *                                              SIZES                                             *
 ************************************************************************************************ */
.md-icon.md-18 { font-size: 18px; }
.md-icon.md-24 { font-size: 24px; }
.md-icon.md-36 { font-size: 36px; }
.md-icon.md-48 { font-size: 48px; }
.md-icon.md-60 { font-size: 60px; }
.md-icon.md-72 { font-size: 72px; }
`;

/**
 * Builds a path for a given file based on the output directory.
 * @param {*} outDir
 * @param {*} fileName
 * @returns string
 */
const buildPath = (outDir, fileName) => join(outDir, fileName);

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // implementation
  buildStyleSheet,
  buildPath,
};
