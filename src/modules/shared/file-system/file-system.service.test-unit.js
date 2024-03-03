import fs from 'fs';
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
    accessSpy.mockClear();
  });

  test('throws an error if the path is not a directory', async () => {
    const readdirSpy = readdirSpyFactory(new Error('Error: ENOTDIR: not a directory, scandir'));
    await expect(() => Service.readPathContent('./nonexistentdir')).rejects.toThrow('ENOTDIR');
    expect(readdirSpy).toHaveBeenCalledTimes(1);
    readdirSpy.mockClear();
  });

  test('can read an empty directory', async () => {
    const readdirSpy = readdirSpyFactory(null, []);
    await expect(Service.readPathContent('./realdir')).resolves.toStrictEqual({
      directories: [],
      files: [],
    });
    expect(readdirSpy).toHaveBeenCalledTimes(1);
    readdirSpy.mockClear();
  });

  test('can read a directory with files and directories in it', async () => {
    const readdirSpy = readdirSpyFactory(null, [
      'some-dir',
      'b-file.png',
      'c-file.jpg',
      'a-file.json',
    ]);
    const lstatSpy = lstatSpyFactory([
      { isFile: () => false, birthtimeMs: 1709482230979 },
      { isFile: () => true, birthtimeMs: 1709482230980 },
      { isFile: () => true, birthtimeMs: 1709482230981 },
      { isFile: () => true, birthtimeMs: 1709482230982 },
    ]);
    await expect(Service.readPathContent('./realdir')).resolves.toStrictEqual({
      directories: [
        {
          path: './realdir/some-dir', baseName: 'some-dir', ext: '', isFile: false, creation: 1709482230979,
        },
      ],
      files: [
        {
          path: './realdir/a-file.json', baseName: 'a-file.json', ext: '.json', isFile: true, creation: 1709482230982,
        },
        {
          path: './realdir/b-file.png', baseName: 'b-file.png', ext: '.png', isFile: true, creation: 1709482230980,
        },
        {
          path: './realdir/c-file.jpg', baseName: 'c-file.jpg', ext: '.jpg', isFile: true, creation: 1709482230981,
        },
      ],
    });
    expect(readdirSpy).toHaveBeenCalledTimes(1);
    expect(lstatSpy).toHaveBeenCalledTimes(4);
    readdirSpy.mockClear();
    lstatSpy.mockClear();
  });

  test('can read a directory and filter files by extension', async () => {
    const readdirSpy = readdirSpyFactory(null, [
      'b-file.png',
      'c-file.jpg',
      'a-file.json',
    ]);
    const lstatSpy = lstatSpyFactory([
      { isFile: () => true, birthtimeMs: 1709482230980 },
      { isFile: () => true, birthtimeMs: 1709482230981 },
      { isFile: () => true, birthtimeMs: 1709482230982 },
    ]);
    await expect(Service.readPathContent('./realdir', ['.png'])).resolves.toStrictEqual({
      directories: [],
      files: [{
        path: './realdir/b-file.png', baseName: 'b-file.png', ext: '.png', isFile: true, creation: 1709482230980,
      }],
    });
    expect(readdirSpy).toHaveBeenCalledTimes(1);
    expect(lstatSpy).toHaveBeenCalledTimes(3);
    readdirSpy.mockClear();
    lstatSpy.mockClear();
  });
});
