import { describe, test, afterAll, afterEach, beforeAll, beforeEach, expect, jest } from '@jest/globals';
import { prettifyImageDimensions } from '../shared/utilities/utilities.js';
import { pathExists, deleteDirectory } from '../shared/file-system/file-system.service.js';
import { CONFIG } from './favicon-builder.config.js';
import { build } from './favicon-builder.service.js';

/* ************************************************************************************************
 *                                             MOCKS                                              *
 ************************************************************************************************ */

/**
 * Favicon Builder Config Mock
 * Since the number of assets that are generated is significant, it will be reduced to only
 * generating the first and last images.
 */
jest.mock('./favicon-builder.config.js', () => {
  const originalModule = jest.requireActual('./favicon-builder.config.js');
  return {
    __esModule: true,
    CONFIG: {
      outputDimensions: [
        originalModule.CONFIG.outputDimensions[0],
        originalModule.CONFIG.outputDimensions.at(-1),
      ],
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

  test('can build the Favicon Assets', async () => {
    const id = await build('./favicon-assetsample.png');
    expect(await pathExists(id)).toBe(true);
    expect(await pathExists(`${id}/favicon.ico`)).toBe(true);
    expect(await pathExists(`${id}/receipt.txt`)).toBe(true);
    expect(await pathExists(`${id}/source.png`)).toBe(true);
    expect(await pathExists(`${id}/favicons`)).toBe(true);
    const variations = await Promise.all(
      CONFIG.outputDimensions.map(
        (dim) => pathExists(`${id}/favicons/${prettifyImageDimensions(dim)}.png`),
      ),
    );
    expect(variations.every((exists) => exists === true)).toBe(true);
    await deleteDirectory(id);
  });
});
