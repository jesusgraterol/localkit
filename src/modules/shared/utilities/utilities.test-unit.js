import Utilities from './utilities.js';

// RegEx to validate formatted dates
const dateRegEx = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4},\s[0-9]{2}:[0-9]{2}:[0-9]{2}\s(AM|PM)/;


describe('Date Formatting', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can properly format the current time', () => {
    const date = Utilities.formatDate();
    expect(typeof date).toBe('string');
    expect(date.length).toBe(23);
    expect(dateRegEx.test(date)).toBe(true);
  });

  test('can properly format the current time (passing the current timestamp)', () => {
    const date = Utilities.formatDate(Date.now());
    expect(typeof date).toBe('string');
    expect(date.length).toBe(23);
    expect(dateRegEx.test(date)).toBe(true);
  });

  test('can properly format a time from the past', () => {
    const date = Utilities.formatDate(1672622975000);
    expect(date).toEqual('01/01/2023, 09:29:35 PM');
  });
});
