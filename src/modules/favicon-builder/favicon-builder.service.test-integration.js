import Utilities from '../shared/utilities/utilities.js';
import FileSystemService from '../shared/file-system/file-system.service.js';
import FaviconBuilderService from './favicon-builder.service.js';
import CONFIG from './favicon-builder.config.js';


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
