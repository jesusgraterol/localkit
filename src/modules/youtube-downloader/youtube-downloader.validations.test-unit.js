import { describe, test, afterAll, afterEach, beforeAll, beforeEach, expect } from '@jest/globals';
import { isURLValid } from './youtube-downloader.validations.js';


describe('General Validations', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can identify valid Youtube URLs', () => {
    expect(isURLValid('https://www.youtube.com/watch?v=owUitkVtubk')).toBe(true);
    expect(isURLValid('https://www.youtube.com/watch?v=P7fHdn8MLMo')).toBe(true);
    expect(isURLValid('https://www.youtube.com/watch?v=BWMSQVNlcno')).toBe(true);
  });

  test('can identify invalid Youtube URLs', () => {
    expect(isURLValid('https://www.youtube.com')).toBe(false);
    expect(isURLValid('https://www.youtube.com/watch?')).toBe(false);
    expect(isURLValid('youtube.com/watch?v=BWMSQVNlcno')).toBe(false);
    expect(isURLValid('https://drive.google.com/drive/u/1/my-drive')).toBe(false);
  });
});
