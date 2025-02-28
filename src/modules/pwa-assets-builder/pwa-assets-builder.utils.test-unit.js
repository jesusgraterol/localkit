import { describe, test, afterAll, afterEach, beforeAll, beforeEach, expect, jest } from '@jest/globals';
import { Buffer } from 'node:buffer';
import sharp from 'sharp';
import { MANIFEST_FILE } from './manifest-template.js';
import { prettifyImageDimensions } from '../shared/utilities/utilities.js';
import {
  generateAssetName,
  generateBackgroundImage,
  generateLogoImage,
  buildManifestFile,
  buildReceiptFile,
} from './pwa-assets-builder.utils.js';

/* ************************************************************************************************
 *                                             MOCKS                                              *
 ************************************************************************************************ */

/**
 * Sharp Mock
 * The mock implementation in order to prevent side effects by calling the real sharp factory func.
 */
const MOCK_DIMENSIONS = { width: 128, height: 128 };
const MOCK_LOGO_IMAGE = Buffer.from('mock_logo_image');
jest.mock('sharp', () => jest.fn(() => ({
  metadata: () => Promise.resolve(MOCK_DIMENSIONS),
  resize: () => ({
    toBuffer: () => Promise.resolve(MOCK_LOGO_IMAGE),
  }),
})));





/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('Assets Build Utilities', () => {
  beforeAll(() => { });

  afterAll(() => {
    sharp.mockRestore();
  });

  beforeEach(() => {
    sharp.mockClear();
  });

  afterEach(() => { });

  test('can generate the name for an asset', () => {
    expect(generateAssetName({ width: 256, height: 256 })).toBe('256x256.png');
    expect(generateAssetName({ width: 128, height: 64 }, '.jpg')).toBe('128x64.jpg');
    expect(generateAssetName({ width: 512, height: 512 }, '.webp')).toBe('512x512.webp');
  });

  test('can generate the background image', () => {
    generateBackgroundImage({ width: 128, height: 128 }, '#000000');
    expect(sharp).toHaveBeenCalledWith({
      create: {
        width: 128,
        height: 128,
        channels: 3,
        background: '#000000',
      },
    });
  });

  test('cannot generate the logo image if the source file has the wrong dimensions', async () => {
    await expect(() => generateLogoImage(
      'fakePath.png',
      { logoScale: 0.5 },
      { width: 512, height: 512 },
    )).rejects.toThrow('The required logo dimensions are: 512x512. Received: 128x128');
  });

  test('can generate a logo image', async () => {
    const logoImage = await generateLogoImage(
      'fakePath.png',
      { logoScale: 0.5 },
      { width: 128, height: 128 },
    );
    expect(sharp).toHaveBeenCalledWith('fakePath.png');
    expect(MOCK_LOGO_IMAGE.equals(logoImage)).toBe(true);
  });
});





describe('Manifest Build Utilities', () => {
  beforeAll(() => { });

  afterAll(() => {});

  beforeEach(() => {});

  afterEach(() => { });

  test('can build the manifest file based on a list of icons', () => {
    const manifest = buildManifestFile([
      { dimensions: { width: 48, height: 48 }, logoScale: 0.037 },
      { dimensions: { width: 1024, height: 1024 }, logoScale: 0.65 },
    ], '#0C0C0C');
    expect(manifest).toStrictEqual({
      ...MANIFEST_FILE,
      theme_color: '#0C0C0C',
      background_color: '#0C0C0C',
      icons: [
        {
          src: 'pwa-assets/icons/48x48.png',
          sizes: '48x48',
          type: 'image/png',
          purpose: 'maskable any',
        },
        {
          src: 'pwa-assets/icons/1024x1024.png',
          sizes: '1024x1024',
          type: 'image/png',
          purpose: 'maskable any',
        },
      ],
    });
  });
});





describe('Receipt Build Utilities', () => {
  beforeAll(() => { });

  afterAll(() => {});

  beforeEach(() => {});

  afterEach(() => { });

  test('can build the receipt file', () => {
    // init a fake id as well as the root path for the asets
    const sourcePath = './/pwa-assetsample.png';
    const bgColor = '#000000';
    const id = 'ID_MOCK';

    // build the receipt content
    const outputConfig = {
      icons: [
        { dimensions: { width: 16, height: 16 }, logoScale: 0.012 },
        { dimensions: { width: 2480, height: 1200 }, logoScale: 0.83 },
      ],
      'apple-touch-icons': [
        { dimensions: { width: 16, height: 16 }, logoScale: 0.012 },
        { dimensions: { width: 1024, height: 1024 }, logoScale: 0.65 },
      ],
    };
    const receipt = buildReceiptFile(sourcePath, bgColor, id, outputConfig);

    // ensure it contains the core info
    expect(receipt).toContain(sourcePath);
    expect(receipt).toContain(bgColor);
    expect(receipt).toContain(id);
    expect(receipt).toContain(bgColor);
    Object.keys(outputConfig).forEach((category) => {
      expect(receipt).toContain(category);
      outputConfig[category].forEach((asset) => (
        expect(receipt).toContain(`${prettifyImageDimensions(asset.dimensions)}.png`)
      ));
    });
  });
});
