/**
 * Favicon Builder Configuration
 * The configuration that will be used in order to generate the Favicon Build.
 */
const CONFIG = {
  // the list of dimensions (in pixels) that will be generated and included in the build.
  // important: this list should be kept in ascending order.
  outputDimensions: [
    { width: 16, height: 16 },
    { width: 32, height: 32 },
    { width: 48, height: 48 },
    { width: 64, height: 64 },
    { width: 96, height: 96 },
    { width: 112, height: 112 },
    { width: 128, height: 128 },
    { width: 144, height: 144 },
    { width: 160, height: 160 },
    { width: 176, height: 176 },
    { width: 192, height: 192 },
    { width: 208, height: 208 },
    { width: 224, height: 224 },
    { width: 240, height: 240 },
    { width: 256, height: 256 },
    { width: 384, height: 384 },
    { width: 512, height: 512 },
  ],
};

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export { CONFIG };
