import { describe, test, afterAll, afterEach, beforeAll, beforeEach, expect } from '@jest/globals';
import { Buffer } from 'node:buffer';
import Service from './file-system.service.js';
import {
  // spy factories
  accessSpyFactory,
  lstatSpyFactory,
  readdirSpyFactory,
  rmSpyFactory,
  mkdirSpyFactory,
  writeFileSpyFactory,

  // misc test helpers
  buildFileSystemElement,
  validateSpyInteractions,
} from './file-system.service.test-unit.utils.js';




describe('General Management', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can identify when a path does not exist', async () => {
    const accessSpy = accessSpyFactory(new Error('The path does not exist!'));
    expect(await Service.pathExists('./package.json')).toBe(false);
    validateSpyInteractions(expect, accessSpy, 1, ['./package.json']);
  });

  test('can identify when a path exists', async () => {
    const accessSpy = accessSpyFactory(null);
    expect(await Service.pathExists('./package.json')).toBe(true);
    validateSpyInteractions(expect, accessSpy, 1, ['./package.json']);
  });

  test('throws an error if the path is not a directory', async () => {
    const readdirSpy = readdirSpyFactory(new Error('Error: ENOTDIR: not a directory, scandir'));
    await expect(() => Service.readPathContent('./nonexistentdir')).rejects.toThrow('ENOTDIR');
    validateSpyInteractions(expect, readdirSpy, 1, ['./nonexistentdir']);
  });

  test('can read an empty directory', async () => {
    const readdirSpy = readdirSpyFactory(null, []);
    await expect(Service.readPathContent('./realdir')).resolves.toStrictEqual({
      directories: [],
      files: [],
    });
    validateSpyInteractions(expect, readdirSpy, 1, ['./realdir']);
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
    validateSpyInteractions(expect, readdirSpy, 1, ['./realdir']);
    validateSpyInteractions(expect, lstatSpy, 4, els.map((el) => el.path));
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
    validateSpyInteractions(expect, readdirSpy, 1, ['./realdir']);
    validateSpyInteractions(expect, lstatSpy, 3, els.map((el) => el.path));
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
    validateSpyInteractions(expect, rmSpy, 1, [['./non-existent', { force: true, recursive: true }]]);
  });

  test('can delete a directory', async () => {
    const rmSpy = rmSpyFactory(null);
    await expect(Service.deleteDirectory('./existent')).resolves.toBe(undefined);
    validateSpyInteractions(expect, rmSpy, 1, [['./existent', { force: true, recursive: true }]]);
  });

  test('if a directory will be created at an empty path, it does not attempt to delete it', async () => {
    const accessSpy = accessSpyFactory(new Error('Non existent path!'));
    const rmSpy = rmSpyFactory(null);
    const mkdirSpy = mkdirSpyFactory(null);
    await expect(Service.makeDirectory('./non-existent')).resolves.toBe(undefined);
    validateSpyInteractions(expect, accessSpy, 1, [['./non-existent']]);
    validateSpyInteractions(expect, rmSpy, 0, []);
    validateSpyInteractions(expect, mkdirSpy, 1, [['./non-existent']]);
  });

  test('if a directory will be created at a non-empty path, it deletes the directory prior to creating the new one', async () => {
    const accessSpy = accessSpyFactory(null);
    const rmSpy = rmSpyFactory(null);
    const mkdirSpy = mkdirSpyFactory(null);
    await expect(Service.makeDirectory('./existent')).resolves.toBe(undefined);
    validateSpyInteractions(expect, accessSpy, 1, [['./existent']]);
    validateSpyInteractions(expect, rmSpy, 1, [['./existent']]);
    validateSpyInteractions(expect, mkdirSpy, 1, [['./existent']]);
  });
});




describe('File Management', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  describe('writeFile', () => {
    beforeAll(() => { });

    afterAll(() => { });

    beforeEach(() => { });

    afterEach(() => { });

    test('can write a file with standard text', async () => {
      const writeFileSpy = writeFileSpyFactory();
      await expect(Service.writeFile('./existent.txt', 'Hello!')).resolves.toBe(undefined);
      validateSpyInteractions(expect, writeFileSpy, 1, [['./existent.txt', 'Hello!', { encoding: 'utf-8' }]]);
    });

    test('can write a file with JSON data (the content is automatically stringified)', async () => {
      const writeFileSpy = writeFileSpyFactory();
      await expect(Service.writeFile('./existent.json', { x: 'Hi!' })).resolves.toBe(undefined);
      validateSpyInteractions(expect, writeFileSpy, 1, [['./existent.json', JSON.stringify({ x: 'Hi!' }), { encoding: 'utf-8' }]]);
    });

    test('can write a file with Buffer data', async () => {
      const writeFileSpy = writeFileSpyFactory();
      await expect(Service.writeFile('./existent', Buffer.from('Hi!'))).resolves.toBe(undefined);
      validateSpyInteractions(expect, writeFileSpy, 1, [['./existent', Buffer.from('Hi!'), {}]]);
    });

    test('can handle an error when writing a file', async () => {
      const writeFileSpy = writeFileSpyFactory(new Error('Ops! There was an error!'));
      await expect(Service.writeFile('./wrong-file', '')).rejects.toThrow('Ops! There was an error!');
      validateSpyInteractions(expect, writeFileSpy, 1, [['./wrong-file', '', { encoding: 'utf-8' }]]);
    });
  });
});
