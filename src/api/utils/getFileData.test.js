const getFileData = require('./getFileData');

describe('getFileData', () => {
  it('should get a list of events from the file "challenge_data"', async () => {
    const data = await getFileData();
    expect(data.length).toBeGreaterThan(0);
  });
});
