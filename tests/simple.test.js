const convert = require('..');
const getTestStrings = require('./utils/testStringLoader');

describe('Simple tests', () => {
  it('Works with strings', () => {
    expect(convert('abc')).toBe('abc\n\n');
  });

  it('Works with Buffer', () => {
    expect(convert(Buffer.from('abc', 'utf8'))).toBe('abc\n\n');
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

  it('Converts italics', () => {
    const {source, target} = getTestStrings('italics');

    expect(convert(source)).toStrictEqual(expect.stringContaining(target));
  });

  it('Converts strikethrough', () => {
    const {source, target} = getTestStrings('strikethrough');

    expect(convert(source)).toStrictEqual(expect.stringContaining(target));
  });

  it('Different types of headings', () => {
    const {source, target} = getTestStrings('headings');

    expect(convert(source)).toStrictEqual(expect.stringContaining(target));
  });

  it('Horizontal rule', () => {
    const {source, target} = getTestStrings('hr');

    expect(convert(source)).toStrictEqual(expect.stringContaining(target));
  });

  it('Converts br to newline', () => {
    const {source, target} = getTestStrings('br');

    expect(convert(source)).toStrictEqual(expect.stringContaining(target));
  });
});
