import { describe, test, afterAll, afterEach, beforeAll, beforeEach, expect } from '@jest/globals';
import { Buffer } from 'node:buffer';
import {
  pathExists,
  readPathContent,
  deleteDirectory,
  makeDirectory,
  writeFile,
  readFile,
  deleteFile,
  copyFile,
} from './file-system.service.js';
import {
  // spy factories
  accessSpyFactory,
  lstatSpyFactory,
  readdirSpyFactory,
  rmSpyFactory,
  mkdirSpyFactory,
  writeFileSpyFactory,
  readFileSpyFactory,
  unlinkSpyFactory,
  copyFileSpyFactory,

  // misc test helpers
  buildFileSystemElement,
  validateSpyInteractions,
} from './file-system.service.test-unit.utils.js';

/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('General Management', () => {
  beforeAll(() => {});

  afterAll(() => {});

  beforeEach(() => {});

  afterEach(() => {});

  test('can identify when a path does not exist', async () => {
    const accessSpy = accessSpyFactory(new Error('The path does not exist!'));
    expect(await pathExists('./package.json')).toBe(false);
    validateSpyInteractions(expect, accessSpy, 1, ['./package.json']);
  });

  test('can identify when a path exists', async () => {
    const accessSpy = accessSpyFactory(null);
    expect(await pathExists('./package.json')).toBe(true);
    validateSpyInteractions(expect, accessSpy, 1, ['./package.json']);
  });

  test('throws an error if the path is not a directory', async () => {
    const readdirSpy = readdirSpyFactory(new Error('Error: ENOTDIR: not a directory, scandir'));
    await expect(() => readPathContent('./nonexistentdir')).rejects.toThrow('ENOTDIR');
    validateSpyInteractions(expect, readdirSpy, 1, ['./nonexistentdir']);
  });

  test('can read an empty directory', async () => {
    const readdirSpy = readdirSpyFactory(null, []);
    await expect(readPathContent('./realdir')).resolves.toStrictEqual({
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
    const readdirSpy = readdirSpyFactory(
      null,
      els.map((el) => el.baseName),
    );
    const lstatSpy = lstatSpyFactory(
      els.map((el) => ({
        isFile: () => el.isFile,
        birthtimeMs: el.creation,
      })),
    );
    await expect(readPathContent('./realdir')).resolves.toStrictEqual({
      directories: [els[0]],
      files: [els[3], els[1], els[2]],
    });
    validateSpyInteractions(expect, readdirSpy, 1, ['./realdir']);
    validateSpyInteractions(
      expect,
      lstatSpy,
      4,
      els.map((el) => el.path),
    );
  });

  test('can read a directory and filter files by extension', async () => {
    const els = [
      buildFileSystemElement('./realdir/b-file.png', true, 1709482230980),
      buildFileSystemElement('./realdir/c-file.jpg', true, 1709482230981),
      buildFileSystemElement('./realdir/a-file.json', true, 1709482230982),
    ];
    const readdirSpy = readdirSpyFactory(
      null,
      els.map((el) => el.baseName),
    );
    const lstatSpy = lstatSpyFactory(
      els.map((el) => ({
        isFile: () => el.isFile,
        birthtimeMs: el.creation,
      })),
    );
    await expect(readPathContent('./realdir', ['.png'])).resolves.toStrictEqual({
      directories: [],
      files: [els[0]],
    });
    validateSpyInteractions(expect, readdirSpy, 1, ['./realdir']);
    validateSpyInteractions(
      expect,
      lstatSpy,
      3,
      els.map((el) => el.path),
    );
  });
});

describe('Directory Management', () => {
  beforeAll(() => {});

  afterAll(() => {});

  beforeEach(() => {});

  afterEach(() => {});

  test('can handle an error when deleting a directory', async () => {
    const rmSpy = rmSpyFactory(new Error('Some weird error!'));
    await expect(deleteDirectory('./non-existent')).rejects.toThrow('Some weird error!');
    validateSpyInteractions(expect, rmSpy, 1, [
      ['./non-existent', { force: true, recursive: true }],
    ]);
  });

  test('can delete a directory', async () => {
    const rmSpy = rmSpyFactory(null);
    await expect(deleteDirectory('./existent')).resolves.toBe(undefined);
    validateSpyInteractions(expect, rmSpy, 1, [['./existent', { force: true, recursive: true }]]);
  });

  test('if a directory will be created at an empty path, it does not attempt to delete it', async () => {
    const accessSpy = accessSpyFactory(new Error('Non existent path!'));
    const rmSpy = rmSpyFactory(null);
    const mkdirSpy = mkdirSpyFactory(null);
    await expect(makeDirectory('./non-existent')).resolves.toBe(undefined);
    validateSpyInteractions(expect, accessSpy, 1, [['./non-existent']]);
    validateSpyInteractions(expect, rmSpy, 0, []);
    validateSpyInteractions(expect, mkdirSpy, 1, [['./non-existent']]);
  });

  test('if a directory will be created at a non-empty path, it deletes the directory prior to creating the new one', async () => {
    const accessSpy = accessSpyFactory(null);
    const rmSpy = rmSpyFactory(null);
    const mkdirSpy = mkdirSpyFactory(null);
    await expect(makeDirectory('./existent')).resolves.toBe(undefined);
    validateSpyInteractions(expect, accessSpy, 1, [['./existent']]);
    validateSpyInteractions(expect, rmSpy, 1, [['./existent']]);
    validateSpyInteractions(expect, mkdirSpy, 1, [['./existent']]);
  });
});

describe('File Management', () => {
  beforeAll(() => {});

  afterAll(() => {});

  beforeEach(() => {});

  afterEach(() => {});

  describe('writeFile', () => {
    beforeAll(() => {});

    afterAll(() => {});

    beforeEach(() => {});

    afterEach(() => {});

    test('can write a file with standard text', async () => {
      const writeFileSpy = writeFileSpyFactory();
      await expect(writeFile('./existent.txt', 'Hello!')).resolves.toBe(undefined);
      validateSpyInteractions(expect, writeFileSpy, 1, [
        ['./existent.txt', 'Hello!', { encoding: 'utf-8' }],
      ]);
    });

    test('can write a file with JSON data (the content is automatically stringified)', async () => {
      const writeFileSpy = writeFileSpyFactory();
      await expect(writeFile('./existent.json', { x: 'Hi!' })).resolves.toBe(undefined);
      validateSpyInteractions(expect, writeFileSpy, 1, [
        ['./existent.json', JSON.stringify({ x: 'Hi!' }), { encoding: 'utf-8' }],
      ]);
    });

    test('can write a file with Buffer data', async () => {
      const writeFileSpy = writeFileSpyFactory();
      await expect(writeFile('./existent', Buffer.from('Hi!'))).resolves.toBe(undefined);
      validateSpyInteractions(expect, writeFileSpy, 1, [['./existent', Buffer.from('Hi!'), {}]]);
    });

    test('can handle an error when writing a file', async () => {
      const writeFileSpy = writeFileSpyFactory(new Error('Ops! There was an error!'));
      await expect(writeFile('./wrong-file', '')).rejects.toThrow('Ops! There was an error!');
      validateSpyInteractions(expect, writeFileSpy, 1, [
        ['./wrong-file', '', { encoding: 'utf-8' }],
      ]);
    });
  });

  describe('readFile', () => {
    beforeAll(() => {});

    afterAll(() => {});

    beforeEach(() => {});

    afterEach(() => {});

    test('cannot read a file that does not exist', async () => {
      const accessSpy = accessSpyFactory(new Error('Does not exist!'));
      await expect(readFile('./non-existent.txt')).rejects.toThrow(
        'The file ./non-existent.txt does not exist.',
      );
      validateSpyInteractions(expect, accessSpy, 1, [['./non-existent.txt']]);
    });

    test('if an error is thrown when handling a file, it is properly handled', async () => {
      const accessSpy = accessSpyFactory(null);
      const readFileSpy = readFileSpyFactory(new Error('Disk Failure!'));
      await expect(readFile('./existent.txt')).rejects.toThrow('Disk Failure!');
      validateSpyInteractions(expect, accessSpy, 1, [['./existent.txt']]);
      validateSpyInteractions(expect, readFileSpy, 1, [['./existent.txt']]);
    });

    test('can successfully read a file and return its contents as a String', async () => {
      const accessSpy = accessSpyFactory(null);
      const content = { toString: () => 'File Content!' };
      const readFileSpy = readFileSpyFactory(null, content);
      await expect(readFile('./existent.txt')).resolves.toBe(content.toString());
      validateSpyInteractions(expect, accessSpy, 1, [['./existent.txt']]);
      validateSpyInteractions(expect, readFileSpy, 1, [['./existent.txt']]);
    });

    test('if reading a json file, it resolves the parsed contents', async () => {
      const accessSpy = accessSpyFactory(null);
      const content = { foo: 'abc', bar: 123 };
      const readFileSpy = readFileSpyFactory(null, JSON.stringify(content));
      await expect(readFile('./existent.json')).resolves.toEqual(content);
      validateSpyInteractions(expect, accessSpy, 1, [['./existent.json']]);
      validateSpyInteractions(expect, readFileSpy, 1, [['./existent.json']]);
    });
  });

  describe('deleteFile', () => {
    beforeAll(() => {});

    afterAll(() => {});

    beforeEach(() => {});

    afterEach(() => {});

    test('can handle an error when attempting to delete a file', async () => {
      const unlinkSpy = unlinkSpyFactory(new Error('Some nasty error!'));
      await expect(deleteFile('./some-file.txt')).rejects.toThrow('Some nasty error!');
      validateSpyInteractions(expect, unlinkSpy, 1, [['./some-file.txt']]);
    });

    test('can delete a file', async () => {
      const unlinkSpy = unlinkSpyFactory(null);
      await expect(deleteFile('./some-file.txt')).resolves.toBeUndefined();
      validateSpyInteractions(expect, unlinkSpy, 1, [['./some-file.txt']]);
    });
  });

  describe('copyFile', () => {
    beforeAll(() => {});

    afterAll(() => {});

    beforeEach(() => {});

    afterEach(() => {});

    test('can handle an error when attempting to copy a file', async () => {
      const copySpy = copyFileSpyFactory(new Error('Some nasty error!'));
      await expect(copyFile('./some-file.txt', './other-file.txt')).rejects.toThrow(
        'Some nasty error!',
      );
      validateSpyInteractions(expect, copySpy, 1, [['./some-file.txt', './other-file.txt']]);
    });

    test('can copy a file', async () => {
      const copySpy = copyFileSpyFactory(null);
      await expect(copyFile('./some-file.txt', './other-file.txt')).resolves.toBeUndefined();
      validateSpyInteractions(expect, copySpy, 1, [['./some-file.txt', './other-file.txt']]);
    });
  });
});
