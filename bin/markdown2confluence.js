#!/usr/bin/env node
var md2conflu = require('../')
var fs = require('fs')
var path = require('path')
var assert = require('assert')

var filename = process.argv[2]
const outputFileName = process.argv[3]
assert(filename, 'should have filename')

fs.readFile(path.resolve(process.cwd(), filename), function(err, buffer) {
    assert(!err, 'read file ' + filename + ' error!')

    // We want to remove widdershins metadata
    const commentEnd = buffer.indexOf('-->', 0);

    // Generate the confluence wiki markup
    const confluenceMarkup = md2conflu(buffer.slice(commentEnd + 3, buffer.length) + '')
    fs.writeFileSync(path.resolve(process.cwd(), outputFileName), confluenceMarkup)
})