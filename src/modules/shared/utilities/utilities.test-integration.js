import Utilities from './utilities';

describe('Asynchronous Delayer', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can delay any action for any number of seconds', async () => {
    const delaySeconds = 0.5;
    const start = Date.now();
    await Utilities.delay(delaySeconds);
    expect(Date.now()).toBeGreaterThanOrEqual(start + (delaySeconds * 1000));
  });
});
