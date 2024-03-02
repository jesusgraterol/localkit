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




describe('General Management', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can identify when a path does not exist.', async () => {
    const accessSpy = accessSpyFactory(new Error('The path does not exist!'));
    expect(await Service.pathExists('./package.json')).toBe(false);
    expect(accessSpy).toHaveBeenCalledTimes(1);
    expect(accessSpy.mock.calls[0][0]).toBe('./package.json');
    accessSpy.mockClear();
  });

  test('can identify when a path exists.', async () => {
    const accessSpy = accessSpyFactory(null);
    expect(await Service.pathExists('./package.json')).toBe(true);
    expect(accessSpy).toHaveBeenCalledTimes(1);
    accessSpy.mockClear();
  });
});
