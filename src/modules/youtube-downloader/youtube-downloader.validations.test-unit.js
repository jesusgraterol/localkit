import YouTubeDownloaderValidations from './youtube-downloader.validations.js';


describe('General Validations', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can identify valid Youtube URLs', () => {
    expect(YouTubeDownloaderValidations.isURLValid('https://www.youtube.com/watch?v=owUitkVtubk')).toBe(true);
    expect(YouTubeDownloaderValidations.isURLValid('https://www.youtube.com/watch?v=P7fHdn8MLMo')).toBe(true);
    expect(YouTubeDownloaderValidations.isURLValid('https://www.youtube.com/watch?v=BWMSQVNlcno')).toBe(true);
  });

  test('can identify invalid Youtube URLs', () => {
    expect(YouTubeDownloaderValidations.isURLValid('https://www.youtube.com')).toBe(false);
    expect(YouTubeDownloaderValidations.isURLValid('https://www.youtube.com/watch?')).toBe(false);
    expect(YouTubeDownloaderValidations.isURLValid('youtube.com/watch?v=BWMSQVNlcno')).toBe(false);
    expect(YouTubeDownloaderValidations.isURLValid('https://drive.google.com/drive/u/1/my-drive')).toBe(false);
  });
});
