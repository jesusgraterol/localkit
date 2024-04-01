import { describe, test, afterAll, afterEach, beforeAll, beforeEach, expect, jest } from '@jest/globals';
import { Buffer } from 'node:buffer';
import sharp from 'sharp';
import MANIFEST_FILE from './manifest-template.js';
import PWAAssetsBuilderUtils from './pwa-assets-builder.utils.js';


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
    expect(PWAAssetsBuilderUtils.generateAssetName({ width: 256, height: 256 })).toBe('256x256.png');
    expect(PWAAssetsBuilderUtils.generateAssetName({ width: 128, height: 64 }, '.jpg')).toBe('128x64.jpg');
    expect(PWAAssetsBuilderUtils.generateAssetName({ width: 512, height: 512 }, '.webp')).toBe('512x512.webp');
  });

  test('can generate the background image', () => {
    PWAAssetsBuilderUtils.generateBackgroundImage({ width: 128, height: 128 }, '#000000');
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
    await expect(() => PWAAssetsBuilderUtils.generateLogoImage(
      'fakePath.png',
      { logoScale: 0.5 },
      { width: 512, height: 512 },
    )).rejects.toThrow('The required logo dimensions are: 512x512. Received: 128x128');
  });

  test('can generate a logo image', async () => {
    const logoImage = await PWAAssetsBuilderUtils.generateLogoImage(
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
    const manifest = PWAAssetsBuilderUtils.buildManifestFile([
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
          purpose: 'any',
        },
        {
          src: 'pwa-assets/icons/1024x1024.png',
          sizes: '1024x1024',
          type: 'image/png',
          purpose: 'any',
        },
      ],
    });
  });
});
