const fs = require('fs');
const path = require('path');

const testsFolder = `${process.cwd()}/tests/mdStrings/`;

const getTestStrings = (testName) => {
  const source = fs
    .readFileSync(path.resolve(testsFolder, `${testName}.md`))
    .toString();

  const target = fs
    .readFileSync(path.resolve(testsFolder, `${testName}.confluence`))
    .toString();

  return {source, target};
};

module.exports = getTestStrings;
export default getTestStrings;
