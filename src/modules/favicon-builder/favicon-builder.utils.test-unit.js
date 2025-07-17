import {
  describe,
  test,
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  expect,
  jest,
} from '@jest/globals';
import sharp from 'sharp';
import { prettifyImageDimensions } from '../shared/utilities/utilities.js';
import {
  getFaviconPathByDimensions,
  readSourcePath,
  generateBuildReceipt,
} from './favicon-builder.utils.js';

/* ************************************************************************************************
 *                                             MOCKS                                              *
 ************************************************************************************************ */

/**
 * Sharp Mock
 * The mock implementation in order to prevent side effects by calling the real sharp factory func.
 */
const MOCK_DIMENSIONS = { width: 128, height: 128 };
jest.mock('sharp', () =>
  jest.fn(() => ({
    metadata: () => Promise.resolve(MOCK_DIMENSIONS),
  })),
);

/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('Misc Helpers', () => {
  beforeAll(() => {});

  afterAll(() => {
    sharp.mockRestore();
  });

  beforeEach(() => {
    sharp.mockClear();
  });

  afterEach(() => {});

  test('can build the path for a favicon image that will be generated', () => {
    expect(
      getFaviconPathByDimensions('BUILD_ID', {
        width: 128,
        height: 128,
      }),
    ).toBe('BUILD_ID/favicons/128x128.png');
  });

  test('cannot read the source path if the image dimensions are invalid', async () => {
    await expect(() => readSourcePath('fakePath.png', { width: 512, height: 512 })).rejects.toThrow(
      'The dimensions of the source file should be: 512x512 minimum',
    );
  });

  test('can read the source path if it meets the dimension requirements', async () => {
    const sourceImage = await readSourcePath('fakePath.png', MOCK_DIMENSIONS);
    expect(sourceImage).toBeTruthy();
    expect(typeof sourceImage.metadata === 'function').toBe(true);
  });
});

describe('Build Receipt', () => {
  beforeAll(() => {});

  afterAll(() => {});

  beforeEach(() => {});

  afterEach(() => {});

  test('can generate a build receipt', () => {
    const outputDimensions = [
      { width: 16, height: 16 },
      { width: 512, height: 512 },
    ];
    const receipt = generateBuildReceipt('fakePath.png', 'SOME_BUILD_ID', outputDimensions);
    expect(receipt).toContain('fakePath.png');
    expect(receipt).toContain('SOME_BUILD_ID');
    expect(outputDimensions.every((dims) => receipt.includes(prettifyImageDimensions(dims)))).toBe(
      true,
    );
  });
});
