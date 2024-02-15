import PWAAssetsBuilderService from './pwa-assets-builder.service.js';

describe('Misc Helpers', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can identify valid colors in hexadecimal formats', () => {
    expect(PWAAssetsBuilderService.isBackgroundColorValid('#000000')).toBe(true);
    expect(PWAAssetsBuilderService.isBackgroundColorValid('#FFFFFF')).toBe(true);
    expect(PWAAssetsBuilderService.isBackgroundColorValid('#ffffff')).toBe(true);
    expect(PWAAssetsBuilderService.isBackgroundColorValid('#990000')).toBe(true);
    expect(PWAAssetsBuilderService.isBackgroundColorValid('#feeef7')).toBe(true);
  });

  test('can identify invalid colors in hexadecimal formats', () => {
    expect(PWAAssetsBuilderService.isBackgroundColorValid('#00000')).toBe(false);
    expect(PWAAssetsBuilderService.isBackgroundColorValid('000000')).toBe(false);
    expect(PWAAssetsBuilderService.isBackgroundColorValid('#0000000')).toBe(false);
    expect(PWAAssetsBuilderService.isBackgroundColorValid('#00000%')).toBe(false);
    expect(PWAAssetsBuilderService.isBackgroundColorValid('#ass9/*')).toBe(false);
  });
});
