#!/usr/bin/env node
var md2conflu = require('../');
var fs = require('fs');
var path = require('path');
var assert = require('assert');

var filename = process.argv[2];
const outputFileName = process.argv[3];

if (!filename) {
  filename = '/dev/stdin';
}

fs.readFile(path.resolve(process.cwd(), filename), (err, buffer) => {
  assert(!err, 'read file ' + filename + ' error!');

  // We want to remove widdershins metadata
  let commentEnd = buffer.indexOf('-->', 0);

  commentEnd = commentEnd > 0 ? (commentEnd += 3) : 0;

  // Generate the confluence wiki markup
  const confluenceMarkup = md2conflu(buffer.slice(commentEnd, buffer.length));

  if (outputFileName) {
    fs.writeFileSync(
      path.resolve(process.cwd(), outputFileName),
      confluenceMarkup,
    );
  } else {
    console.log(confluenceMarkup);
  }

  return confluenceMarkup;
});
