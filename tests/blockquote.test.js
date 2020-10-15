const convert = require('..');
const getTestStrings = require('./utils/testStringLoader');

describe('Blockquote tests', () => {
  it('converts a single line quote correctly', () => {
    const {source, target} = getTestStrings('blockquote');
    expect(convert(source)).toStrictEqual(expect.stringContaining(target));
  });

  it('works on multi-line quotes and multiple quotes', () => {
    const {source, target} = getTestStrings('blockquoteMulti');

    expect(convert(source)).toStrictEqual(expect.stringContaining(target));
  });
});
