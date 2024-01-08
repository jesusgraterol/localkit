import UUIDService from '../../uuid/uuid.service.js';
import FileSystemService from './file-system.service.js';

// the base path that will be used for the tests
const basePath = UUIDService.generate();

describe('Directory Management', () => {
  beforeAll(async () => {
    await FileSystemService.makeDirectory(basePath);
  });

  afterAll(async () => {
    await FileSystemService.deleteDirectory(basePath);
  });

  beforeEach(() => { });

  afterEach(() => { });

  test('can create an empty directory and verify its existance:', async () => {
    const path = `${basePath}/blank-dir`;
    expect(await FileSystemService.pathExists(path)).toBe(false);
    await FileSystemService.makeDirectory(path);
    expect(await FileSystemService.pathExists(path)).toBe(true);
  });

  test('can create an empty directory and delete it:', async () => {
    const path = `${basePath}/to-be-deleted-dir`;
    await FileSystemService.makeDirectory(path);
    expect(await FileSystemService.pathExists(path)).toBe(true);
    await FileSystemService.deleteDirectory(path);
    expect(await FileSystemService.pathExists(path)).toBe(false);
  });

  test('can create a tree of nested directories and files. Then delete the parent node:', async () => {
    const path = `${basePath}/dir-tree`;
    await FileSystemService.makeDirectory(path);
    await FileSystemService.makeDirectory(`${path}/child-1`);
    await FileSystemService.writeFile(`${path}/child-1/test-file.txt`, 'Hi, this is Jess!');
    await FileSystemService.makeDirectory(`${path}/child-2`);
    await FileSystemService.makeDirectory(`${path}/child-3`);
    await FileSystemService.makeDirectory(`${path}/child-3/grand-child-01`);
    await FileSystemService.writeFile(`${path}/child-3/grand-child-01/some-obj.json`, {
      foo: 'bar', bar: 'foo',
    });

    // ensure all the dirs have been created
    const dirsExistance = await Promise.all([
      FileSystemService.pathExists(path),
      FileSystemService.pathExists(`${path}/child-1`),
      FileSystemService.pathExists(`${path}/child-1/test-file.txt`),
      FileSystemService.pathExists(`${path}/child-2`),
      FileSystemService.pathExists(`${path}/child-3`),
      FileSystemService.pathExists(`${path}/child-3/grand-child-01`),
    ]);
    expect(dirsExistance.every((exists) => exists === true)).toBe(true);
    expect(await FileSystemService.pathExists(path)).toBe(true);

    // delete the parent dir and ensure all the dirs are gone
    await FileSystemService.deleteDirectory(path);
    const deletedDirsExistance = await Promise.all([
      FileSystemService.pathExists(path),
      FileSystemService.pathExists(`${path}/child-1`),
      FileSystemService.pathExists(`${path}/child-1/test-file.txt`),
      FileSystemService.pathExists(`${path}/child-2`),
      FileSystemService.pathExists(`${path}/child-3`),
      FileSystemService.pathExists(`${path}/child-3/grand-child-01`),
      FileSystemService.pathExists(`${path}/child-3/grand-child-01/some-obj.json`),
    ]);
    expect(deletedDirsExistance.every((exists) => exists === false)).toBe(true);
  });
});





describe('File Management', () => {
  beforeAll(async () => {
    await FileSystemService.makeDirectory(basePath);
  });

  afterAll(async () => {
    await FileSystemService.deleteDirectory(basePath);
  });

  beforeEach(() => { });

  afterEach(() => { });

  test('can write a text file, verify its existance and read its contents', async () => {
    const path = `${basePath}/text-file.txt`;
    const content = 'Hello world!';
    expect(await FileSystemService.pathExists(path)).toBe(false);
    await FileSystemService.writeFile(path, content);
    expect(await FileSystemService.pathExists(path)).toBe(true);
    expect(await FileSystemService.readFile(path)).toEqual(content);
  });

  test('can write a json file, verify its existance and read its contents', async () => {
    const path = `${basePath}/json-file.json`;
    const content = {
      foo: 'bar', baz: 'foo', hello: true, num: 123456,
    };
    expect(await FileSystemService.pathExists(path)).toBe(false);
    await FileSystemService.writeFile(path, content);
    expect(await FileSystemService.pathExists(path)).toBe(true);
    expect(await FileSystemService.readFile(path)).toEqual(content);
  });

  test('can write a file and delete it afterwards', async () => {
    const path = `${basePath}/some-file.txt`;
    expect(await FileSystemService.pathExists(path)).toBe(false);
    await FileSystemService.writeFile(path, 'Hello world!');
    expect(await FileSystemService.pathExists(path)).toBe(true);
    await FileSystemService.deleteFile(path);
    expect(await FileSystemService.pathExists(path)).toBe(false);
  });

  test('can write a text file and create a copy of it', async () => {
    const path = `${basePath}/text-file.txt`;
    const copyPath = `${basePath}/text-file-copy.txt`;
    const content = 'Hello world!';
    await FileSystemService.writeFile(path, content);
    await FileSystemService.copyFile(path, copyPath);
    expect(await FileSystemService.pathExists(path)).toBe(true);
    expect(await FileSystemService.pathExists(copyPath)).toBe(true);
    expect(await FileSystemService.readFile(path)).toEqual(content);
    expect(await FileSystemService.readFile(copyPath)).toEqual(content);
  });
});
