import { describe, test, afterAll, afterEach, beforeAll, beforeEach, expect, jest } from '@jest/globals';
import Utilities from '../shared/utilities/utilities.js';
import FileSystemService from '../shared/file-system/file-system.service.js';
import CONFIG from './pwa-assets-builder.config.js';
import Service from './pwa-assets-builder.service.js';


/**
 * PWA Assets Builder Config Mock
 * Since the number of assets that are generated is significant, it will be reduced to only
 * generating the first and last images.
 */
jest.mock('./pwa-assets-builder.config.js', () => {
  const originalModule = jest.requireActual('./pwa-assets-builder.config.js');
  return {
    __esModule: true,
    default: {
      ...originalModule.default,
      output: {
        ...originalModule.default.output,
        icons: [
          originalModule.default.output.icons[0],
          originalModule.default.output.icons.at(-1),
        ],
        'apple-touch-icons': [
          originalModule.default.output['apple-touch-icons'][0],
          originalModule.default.output['apple-touch-icons'].at(-1),
        ],
      },
    },
  };
});



describe('Build Process', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can build the PWA Assets', async () => {
    const id = await Service.build('./pwa-assetsample.png', '#0C0C0C');
    const outputPath = `${id}/pwa-assets`;
    await expect(FileSystemService.pathExists(id)).resolves.toBeTruthy();
    await expect(FileSystemService.pathExists(`${id}/source.png`)).resolves.toBeTruthy();
    await expect(FileSystemService.pathExists(outputPath)).resolves.toBeTruthy();

    const assetsExistence = await Promise.all(Object.keys(CONFIG.output).reduce(
      (prev, currentCat) => [
        ...prev,
        FileSystemService.pathExists(`${outputPath}/${currentCat}`),
        ...CONFIG.output[currentCat].map((img) => FileSystemService.pathExists(
          `${outputPath}/${currentCat}/${Utilities.prettifyImageDimensions(img.dimensions)}.png`,
        )),
      ],
      [],
    ));
    expect(assetsExistence.every((exists) => exists === true)).toBeTruthy();

    await expect(FileSystemService.pathExists(`${id}/manifest.webmanifest`)).resolves.toBeTruthy();

    await FileSystemService.deleteDirectory(id);
  });
});
