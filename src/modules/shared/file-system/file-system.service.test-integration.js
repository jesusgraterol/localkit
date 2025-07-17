import { describe, test, afterAll, afterEach, beforeAll, beforeEach, expect } from '@jest/globals';
import { generate } from '../../uuid/uuid.service.js';
import {
  makeDirectory,
  deleteDirectory,
  readPathContent,
  writeFile,
  pathExists,
  readFile,
  copyFile,
  deleteFile,
} from './file-system.service.js';

/* ************************************************************************************************
 *                                           CONSTANTS                                            *
 ************************************************************************************************ */

// the base path that will be used for the tests
const basePath = generate();

/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('General Management', () => {
  beforeAll(() => {});

  afterAll(() => {});

  beforeEach(async () => {
    await makeDirectory(basePath);
  });

  afterEach(async () => {
    await deleteDirectory(basePath);
  });

  test('can read an empty directory:', async () => {
    const { directories, files } = await readPathContent(basePath);
    expect(directories.length).toBe(0);
    expect(files.length).toBe(0);
  });

  test('can read a directory with multiple files in it:', async () => {
    await Promise.all([
      writeFile(`${basePath}/file-01.txt`, 'Hello World!'),
      writeFile(`${basePath}/file-02.json`, { foo: 'bar', baz: 123 }),
      writeFile(`${basePath}/file-03`, 'This file has no format :o'),
    ]);
    const { directories, files } = await readPathContent(basePath);
    expect(directories.length).toBe(0);
    expect(files.length).toBe(3);
    expect(files[0].baseName).toBe('file-01.txt');
    expect(files[1].baseName).toBe('file-02.json');
    expect(files[2].baseName).toBe('file-03');
  });

  test('can read a directory with multiple directories in it:', async () => {
    await Promise.all([
      makeDirectory(`${basePath}/dir-c`),
      makeDirectory(`${basePath}/dir-a`),
      makeDirectory(`${basePath}/dir-b`),
    ]);
    const { directories, files } = await readPathContent(basePath);
    expect(files.length).toBe(0);
    expect(directories.length).toBe(3);
    expect(directories[0].baseName).toBe('dir-a');
    expect(directories[1].baseName).toBe('dir-b');
    expect(directories[2].baseName).toBe('dir-c');
  });

  test('can read a directory with multiple directories and files in it:', async () => {
    await Promise.all([
      makeDirectory(`${basePath}/dir-c`),
      makeDirectory(`${basePath}/dir-a`),
      makeDirectory(`${basePath}/dir-b`),
      writeFile(`${basePath}/file-01.txt`, 'Hello World!'),
      writeFile(`${basePath}/file-02.json`, { foo: 'bar', baz: 123 }),
      writeFile(`${basePath}/file-03`, 'This file has no format :o'),
    ]);
    const { directories, files } = await readPathContent(basePath);
    expect(files.length).toBe(3);
    expect(directories.length).toBe(3);
  });

  test('can filter files by extension:', async () => {
    await Promise.all([
      writeFile(`${basePath}/file-01.txt`, 'Hello World!'),
      writeFile(`${basePath}/file-02.json`, { foo: 'bar', baz: 123 }),
      writeFile(`${basePath}/file-03`, 'This file has no format :o'),
    ]);
    const query1 = await readPathContent(basePath, ['.txt']);
    expect(query1.files.length).toBe(1);
    expect(query1.files[0].baseName).toEqual('file-01.txt');

    const query2 = await readPathContent(basePath, ['.json']);
    expect(query2.files.length).toBe(1);
    expect(query2.files[0].baseName).toEqual('file-02.json');

    const query3 = await readPathContent(basePath, ['']);
    expect(query3.files.length).toBe(1);
    expect(query3.files[0].baseName).toEqual('file-03');
  });
});

describe('Directory Management', () => {
  beforeAll(async () => {
    await makeDirectory(basePath);
  });

  afterAll(async () => {
    await deleteDirectory(basePath);
  });

  beforeEach(() => {});

  afterEach(() => {});

  test('can create an empty directory and verify its existance:', async () => {
    const path = `${basePath}/blank-dir`;
    expect(await pathExists(path)).toBe(false);
    await makeDirectory(path);
    expect(await pathExists(path)).toBe(true);
  });

  test('can create an empty directory and delete it:', async () => {
    const path = `${basePath}/to-be-deleted-dir`;
    await makeDirectory(path);
    expect(await pathExists(path)).toBe(true);
    await deleteDirectory(path);
    expect(await pathExists(path)).toBe(false);
  });

  test('can override an existing dir:', async () => {
    const path = `${basePath}/to-be-deleted-dir`;
    await makeDirectory(path);
    await makeDirectory(`${path}/temp-dir`);
    expect(await pathExists(path)).toBe(true);
    expect(await pathExists(`${path}/temp-dir`)).toBe(true);

    await makeDirectory(path);
    expect(await pathExists(path)).toBe(true);
    expect(await pathExists(`${path}/temp-dir`)).toBe(false);
  });

  test('can create a tree of nested directories and files. Then delete the parent node:', async () => {
    const path = `${basePath}/dir-tree`;
    await makeDirectory(path);
    await makeDirectory(`${path}/child-1`);
    await writeFile(`${path}/child-1/test-file.txt`, 'Hi, this is Jess!');
    await makeDirectory(`${path}/child-2`);
    await makeDirectory(`${path}/child-3`);
    await makeDirectory(`${path}/child-3/grand-child-01`);
    await writeFile(`${path}/child-3/grand-child-01/some-obj.json`, {
      foo: 'bar',
      bar: 'foo',
    });

    // ensure all the dirs have been created
    const dirsExistance = await Promise.all([
      pathExists(path),
      pathExists(`${path}/child-1`),
      pathExists(`${path}/child-1/test-file.txt`),
      pathExists(`${path}/child-2`),
      pathExists(`${path}/child-3`),
      pathExists(`${path}/child-3/grand-child-01`),
    ]);
    expect(dirsExistance.every((exists) => exists === true)).toBe(true);
    expect(await pathExists(path)).toBe(true);

    // delete the parent dir and ensure all the dirs are gone
    await deleteDirectory(path);
    const deletedDirsExistance = await Promise.all([
      pathExists(path),
      pathExists(`${path}/child-1`),
      pathExists(`${path}/child-1/test-file.txt`),
      pathExists(`${path}/child-2`),
      pathExists(`${path}/child-3`),
      pathExists(`${path}/child-3/grand-child-01`),
      pathExists(`${path}/child-3/grand-child-01/some-obj.json`),
    ]);
    expect(deletedDirsExistance.every((exists) => exists === false)).toBe(true);
  });
});

describe('File Management', () => {
  beforeAll(async () => {
    await makeDirectory(basePath);
  });

  afterAll(async () => {
    await deleteDirectory(basePath);
  });

  beforeEach(() => {});

  afterEach(() => {});

  test('can write a text file, verify its existance and read its contents', async () => {
    const path = `${basePath}/text-file.txt`;
    const content = 'Hello world!';
    expect(await pathExists(path)).toBe(false);
    await writeFile(path, content);
    expect(await pathExists(path)).toBe(true);
    expect(await readFile(path)).toEqual(content);
  });

  test('can write a json file, verify its existance and read its contents', async () => {
    const path = `${basePath}/json-file.json`;
    const content = {
      foo: 'bar',
      baz: 'foo',
      hello: true,
      num: 123456,
    };
    expect(await pathExists(path)).toBe(false);
    await writeFile(path, content);
    expect(await pathExists(path)).toBe(true);
    expect(await readFile(path)).toEqual(content);
  });

  test('throws an error if tries to read a file that does not exist', async () => {
    const path = `${basePath}/non-existent.txt`;
    await expect(() => readFile(path)).rejects.toThrow(`The file ${path} does not exist.`);
  });

  test('can write a file and delete it afterwards', async () => {
    const path = `${basePath}/some-file.txt`;
    expect(await pathExists(path)).toBe(false);
    await writeFile(path, 'Hello world!');
    expect(await pathExists(path)).toBe(true);
    await deleteFile(path);
    expect(await pathExists(path)).toBe(false);
  });

  test('can write a text file and create a copy of it', async () => {
    const path = `${basePath}/text-file.txt`;
    const copyPath = `${basePath}/text-file-copy.txt`;
    const content = 'Hello world!';
    await writeFile(path, content);
    await copyFile(path, copyPath);
    expect(await pathExists(path)).toBe(true);
    expect(await pathExists(copyPath)).toBe(true);
    expect(await readFile(path)).toEqual(content);
    expect(await readFile(copyPath)).toEqual(content);
  });
});
