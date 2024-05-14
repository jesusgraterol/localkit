import { describe, test, afterAll, afterEach, beforeAll, beforeEach, expect } from '@jest/globals';
import { getVideoID, getFileName } from './youtube-downloader.utils.js';

describe('Misc Helpers', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can extract a video ID from a Youtube URL', () => {
    expect(getVideoID('https://www.youtube.com/watch?v=nVl0LU3DiHg')).toBe('nVl0LU3DiHg');
    expect(getVideoID('https://www.youtube.com/watch?v=th8BJYiB8wE')).toBe('th8BJYiB8wE');
    expect(getVideoID('https://www.youtube.com/watch?v=iy0K7TCfXmc')).toBe('iy0K7TCfXmc');
    expect(getVideoID('https://www.youtube.com/watch?v=leG0U5wzGlA')).toBe('leG0U5wzGlA');
  });

  test('throws an error when an invalid URL is provided', () => {
    expect(
      () => getVideoID('https://drive.google.com/drive/u/1/my-drive'),
    ).toThrow();
    expect(
      () => getVideoID('https://www.youtube.com/'),
    ).toThrow();
  });

  test('can build a proper name for the downloaded file with any extension', () => {
    expect(getFileName(
      'https://www.youtube.com/watch?v=nVl0LU3DiHg',
      'mp4',
    )).toBe('youtube-nVl0LU3DiHg.mp4');
    expect(getFileName(
      'https://www.youtube.com/watch?v=nVl0LU3DiHg',
      'mp3',
    )).toBe('youtube-nVl0LU3DiHg.mp3');
  });
});
