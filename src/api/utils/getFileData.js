const fs = require('fs');

const getFileData = () =>
  new Promise((res, rej) => {
    fs.readFile('./challenge_data.json', (err, data) => {
      if (err) {
        rej('Error reading file: ', err);
        return null;
      }
      try {
        res(JSON.parse(data));
      } catch (e) {
        rej('Error parsing file: ', e.message);
      }
    });
  });

module.exports = getFileData;
