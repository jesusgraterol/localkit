import { describe, test, afterAll, afterEach, beforeAll, beforeEach, expect, jest } from '@jest/globals';
import Utilities from '../shared/utilities/utilities.js';
import FileSystemService from '../shared/file-system/file-system.service.js';
import FaviconBuilderService from './favicon-builder.service.js';
import CONFIG from './favicon-builder.config.js';

/**
 * Favicon Builder Config Mock
 * Since the number of assets that are generated is significant, it will be reduced to only
 * generating the first and last images.
 */
jest.mock('./favicon-builder.config.js', () => {
  const originalModule = jest.requireActual('./favicon-builder.config.js');
  return {
    __esModule: true,
    default: {
      outputDimensions: [
        originalModule.default.outputDimensions[0],
        originalModule.default.outputDimensions.at(-1),
      ],
    },
  };
});


describe('Build Process', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can build the Favicon Assets', async () => {
    const id = await FaviconBuilderService.build('./favicon-assetsample.png');
    expect(await FileSystemService.pathExists(id)).toBe(true);
    expect(await FileSystemService.pathExists(`${id}/favicon.ico`)).toBe(true);
    expect(await FileSystemService.pathExists(`${id}/receipt.txt`)).toBe(true);
    expect(await FileSystemService.pathExists(`${id}/source.png`)).toBe(true);
    expect(await FileSystemService.pathExists(`${id}/favicons`)).toBe(true);
    const variations = await Promise.all(
      CONFIG.outputDimensions.map(
        (dim) => FileSystemService.pathExists(`${id}/favicons/${Utilities.prettifyImageDimensions(dim)}.png`),
      ),
    );
    expect(variations.every((exists) => exists === true)).toBe(true);
    await FileSystemService.deleteDirectory(id);
  });
});
