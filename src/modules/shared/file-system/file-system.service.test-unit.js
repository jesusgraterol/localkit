import fs from 'fs';
import pathHelper from 'path';
import Service from './file-system.service.js';




/**
 * Spy Factories
 */
const accessSpyFactory = (cbReturnVal) => jest.spyOn(fs, 'access').mockImplementation(
  (path, callback) => callback(cbReturnVal),
);
const lstatSpyFactory = (cbReturnVals) => {
  const mock = jest.spyOn(fs, 'lstat');
  cbReturnVals.forEach(
    (cbVal) => mock.mockImplementationOnce((path, callback) => callback(null, cbVal)),
  );
  return mock;
};
const readdirSpyFactory = (
  cbReturnError,
  cbReturnVal = undefined,
) => jest.spyOn(fs, 'readdir').mockImplementation(
  (path, callback) => callback(cbReturnError, cbReturnVal),
);
const rmSpyFactory = (cbReturnError) => jest.spyOn(fs, 'rm').mockImplementation(
  (path, options, callback) => callback(cbReturnError),
);



/**
 * Misc Test Helpers
 */
const buildFileSystemElement = (path, isFile, creation) => ({
  path,
  baseName: pathHelper.basename(path),
  ext: pathHelper.extname(path),
  isFile,
  creation,
});




describe('General Management', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can identify when a path does not exist', async () => {
    const accessSpy = accessSpyFactory(new Error('The path does not exist!'));
    expect(await Service.pathExists('./package.json')).toBe(false);
    expect(accessSpy).toHaveBeenCalledTimes(1);
    expect(accessSpy.mock.calls[0][0]).toBe('./package.json');
    accessSpy.mockClear();
  });

  test('can identify when a path exists', async () => {
    const accessSpy = accessSpyFactory(null);
    expect(await Service.pathExists('./package.json')).toBe(true);
    expect(accessSpy).toHaveBeenCalledTimes(1);
    expect(accessSpy.mock.calls[0][0]).toBe('./package.json');
    accessSpy.mockClear();
  });

  test('throws an error if the path is not a directory', async () => {
    const readdirSpy = readdirSpyFactory(new Error('Error: ENOTDIR: not a directory, scandir'));
    await expect(() => Service.readPathContent('./nonexistentdir')).rejects.toThrow('ENOTDIR');
    expect(readdirSpy).toHaveBeenCalledTimes(1);
    expect(readdirSpy.mock.calls[0][0]).toBe('./nonexistentdir');
    readdirSpy.mockClear();
  });

  test('can read an empty directory', async () => {
    const readdirSpy = readdirSpyFactory(null, []);
    await expect(Service.readPathContent('./realdir')).resolves.toStrictEqual({
      directories: [],
      files: [],
    });
    expect(readdirSpy).toHaveBeenCalledTimes(1);
    expect(readdirSpy.mock.calls[0][0]).toBe('./realdir');
    readdirSpy.mockClear();
  });

  test('can read a directory with files and directories in it', async () => {
    const els = [
      buildFileSystemElement('./realdir/some-dir', false, 1709482230979),
      buildFileSystemElement('./realdir/b-file.png', true, 1709482230980),
      buildFileSystemElement('./realdir/c-file.jpg', true, 1709482230981),
      buildFileSystemElement('./realdir/a-file.json', true, 1709482230982),
    ];
    const readdirSpy = readdirSpyFactory(null, els.map((el) => el.baseName));
    const lstatSpy = lstatSpyFactory(els.map((el) => ({
      isFile: () => el.isFile,
      birthtimeMs: el.creation,
    })));
    await expect(Service.readPathContent('./realdir')).resolves.toStrictEqual({
      directories: [els[0]],
      files: [els[3], els[1], els[2]],
    });
    expect(readdirSpy).toHaveBeenCalledTimes(1);
    expect(readdirSpy.mock.calls[0][0]).toBe('./realdir');
    expect(lstatSpy).toHaveBeenCalledTimes(4);
    els.forEach((el, index) => expect(lstatSpy.mock.calls[index][0]).toBe(el.path));
    readdirSpy.mockClear();
    lstatSpy.mockClear();
  });

  test('can read a directory and filter files by extension', async () => {
    const els = [
      buildFileSystemElement('./realdir/b-file.png', true, 1709482230980),
      buildFileSystemElement('./realdir/c-file.jpg', true, 1709482230981),
      buildFileSystemElement('./realdir/a-file.json', true, 1709482230982),
    ];
    const readdirSpy = readdirSpyFactory(null, els.map((el) => el.baseName));
    const lstatSpy = lstatSpyFactory(els.map((el) => ({
      isFile: () => el.isFile,
      birthtimeMs: el.creation,
    })));
    await expect(Service.readPathContent('./realdir', ['.png'])).resolves.toStrictEqual({
      directories: [],
      files: [els[0]],
    });
    expect(readdirSpy).toHaveBeenCalledTimes(1);
    expect(readdirSpy.mock.calls[0][0]).toBe('./realdir');
    expect(lstatSpy).toHaveBeenCalledTimes(3);
    els.forEach((el, index) => expect(lstatSpy.mock.calls[index][0]).toBe(el.path));
    readdirSpy.mockClear();
    lstatSpy.mockClear();
  });
});





describe('Directory Management', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can handle an error when deleting a directory', async () => {
    const rmSpy = rmSpyFactory(new Error('Some weird error!'));
    await expect(Service.deleteDirectory('./non-existent')).rejects.toThrow('Some weird error!');
    expect(rmSpy).toHaveBeenCalledTimes(1);
    expect(rmSpy.mock.calls[0][0]).toBe('./non-existent');
    expect(rmSpy.mock.calls[0][1]).toStrictEqual({ force: true, recursive: true });
    rmSpy.mockClear();
  });

  test('can delete a directory', async () => {
    const rmSpy = rmSpyFactory(null);
    await expect(Service.deleteDirectory('./existent')).resolves.toBe(undefined);
    expect(rmSpy).toHaveBeenCalledTimes(1);
    expect(rmSpy.mock.calls[0][0]).toBe('./existent');
    expect(rmSpy.mock.calls[0][1]).toStrictEqual({ force: true, recursive: true });
    rmSpy.mockClear();
  });
});
