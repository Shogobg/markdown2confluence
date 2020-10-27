const convert = require('..');
const getTestStrings = require('./utils/testStringLoader');

const pairs = [
  ['# h1', 'h1. h1\n\n'],
  ['head1\n===', 'h1. head1\n\n'],
  ['###  h3', 'h3. h3\n\n'],
  // ['- item\n  - nested', '\r* item\n** nested\n\n'],
];

describe('Simple tests', () => {
  pairs.forEach((arr, i) => {
    it(`should test that converting '${arr[0]}' results in '${arr[1]}'`, () => {
      expect(convert(arr[0])).toBe(arr[1]);
    });
  });

  it('Converts strong and bold text', () => {
    const {source, target} = getTestStrings('bold');

    expect(convert(source)).toStrictEqual(expect.stringContaining(target));
  });

  it('Plaintext stays the same', () => {
    const {source, target} = getTestStrings('plaintext');

    expect(convert(source)).toStrictEqual(expect.stringContaining(target));
  });

  it('Simple table', () => {
    const {source, target} = getTestStrings('table');

    expect(convert(source)).toStrictEqual(expect.stringContaining(target));
  });

  it('Two new lines between paragraphs', () => {
    const {source, target} = getTestStrings('paragraph');

    expect(convert(source)).toStrictEqual(expect.stringContaining(target));
  });

  it('Converts HTML tags to "tag." style', () => {
    const {source, target} = getTestStrings('html');

    expect(convert(source)).toStrictEqual(expect.stringContaining(target));
  });

  it('Converts HTML tags to "tag." style', () => {
    const {source, target} = getTestStrings('italics');

    expect(convert(source)).toStrictEqual(expect.stringContaining(target));
  });
});
