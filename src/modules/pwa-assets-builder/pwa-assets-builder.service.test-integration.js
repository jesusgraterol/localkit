import { describe, test, afterAll, afterEach, beforeAll, beforeEach, expect, jest } from '@jest/globals';
import { prettifyImageDimensions } from '../shared/utilities/utilities.js';
import { pathExists, deleteDirectory } from '../shared/file-system/file-system.service.js';
import { CONFIG } from './pwa-assets-builder.config.js';
import { build } from './pwa-assets-builder.service.js';

/* ************************************************************************************************
 *                                             MOCKS                                              *
 ************************************************************************************************ */

/**
 * PWA Assets Builder Config Mock
 * Since the number of assets that are generated is significant, it will be reduced to only
 * generating the first and last images.
 */
jest.mock('./pwa-assets-builder.config.js', () => {
  const originalModule = jest.requireActual('./pwa-assets-builder.config.js');
  return {
    __esModule: true,
    CONFIG: {
      ...originalModule.CONFIG,
      output: {
        ...originalModule.CONFIG.output,
        icons: [
          originalModule.CONFIG.output.icons[0],
          originalModule.CONFIG.output.icons.at(-1),
        ],
        'apple-touch-icons': [
          originalModule.CONFIG.output['apple-touch-icons'][0],
          originalModule.CONFIG.output['apple-touch-icons'].at(-1),
        ],
        'apple-splash-screens': [
          originalModule.CONFIG.output['apple-splash-screens'][0],
          originalModule.CONFIG.output['apple-splash-screens'].at(-1),
        ],
      },
    },
  };
});





/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('Build Process', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can build the PWA Assets', async () => {
    const id = await build('./pwa-assetsample.png', '#0C0C0C');
    const outputPath = `${id}/pwa-assets`;
    await expect(pathExists(id)).resolves.toBeTruthy();
    await expect(pathExists(`${id}/source.png`)).resolves.toBeTruthy();
    await expect(pathExists(outputPath)).resolves.toBeTruthy();

    const assetsExistence = await Promise.all(Object.keys(CONFIG.output).reduce(
      (prev, currentCat) => [
        ...prev,
        pathExists(`${outputPath}/${currentCat}`),
        ...CONFIG.output[currentCat].map((img) => pathExists(
          `${outputPath}/${currentCat}/${prettifyImageDimensions(img.dimensions)}.png`,
        )),
      ],
      [],
    ));
    expect(assetsExistence.every((exists) => exists === true)).toBeTruthy();

    await expect(pathExists(`${id}/manifest.webmanifest`)).resolves.toBeTruthy();
    await expect(pathExists(`${id}/receipt.txt`)).resolves.toBeTruthy();

    await deleteDirectory(id);
  });
});
