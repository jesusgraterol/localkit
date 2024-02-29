import { Buffer } from 'node:buffer';
import sharp from 'sharp';
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

  beforeEach(() => { });

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
