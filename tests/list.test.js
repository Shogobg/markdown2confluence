const convert = require('..');
const getTestStrings = require('./utils/testStringLoader');

describe('List tests', () => {
  it('Converts an unordered, collapsed list', () => {
    const {source, target} = getTestStrings('list-unordered-collapsed');

    expect(convert(source)).toStrictEqual(expect.stringContaining(target));
  });

  it('Converts an unordered, expanded list', () => {
    const {source, target} = getTestStrings('list-unordered-expanded');

    expect(convert(source)).toStrictEqual(expect.stringContaining(target));
  });

  it('Converts an ordered, collapsed list', () => {
    const {source, target} = getTestStrings('list-ordered-collapsed');

    expect(convert(source)).toStrictEqual(expect.stringContaining(target));
  });

  it('Converts an ordered, expanded list', () => {
    const {source, target} = getTestStrings('list-ordered-expanded');

    expect(convert(source)).toStrictEqual(expect.stringContaining(target));
  });

  it('Converts complex list', () => {
    const {source, target} = getTestStrings('list-complex');

    expect(convert(source)).toStrictEqual(expect.stringContaining(target));
  });
});
