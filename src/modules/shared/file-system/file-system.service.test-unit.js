import fs from 'fs';
import Service from './file-system.service.js';




/**
 * Spy Factories
 */
const accessSpyFactory = (cbReturnVal) => jest.spyOn(fs, 'access').mockImplementation(
  (path, callback) => callback(cbReturnVal),
);
const lstatSpyFactory = (...cbReturnVals) => jest.spyOn(fs, 'lstat').mockImplementation(
  (path, callback) => callback(...cbReturnVals),
);
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
});
