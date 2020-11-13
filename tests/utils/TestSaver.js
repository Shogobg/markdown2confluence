const fs = require('fs');
const path = require('path');
const testsFolder = `${process.cwd()}/tests/mdStrings/`;
fs.writeFileSync(
  path.resolve(testsFolder, `list-ordered-expanded.confluence`),
  convert(source),
);
