const convert = require('..');
const getTestStrings = require('./utils/testStringLoader');

describe('Link tests', () => {
  it('Simple link', () => {
    const {source, target} = getTestStrings('link');

    expect(convert(source)).toStrictEqual(expect.stringContaining(target));
  });

  it('Link with a reference definition', () => {
    const {source, target} = getTestStrings('linkReference');

    expect(convert(source)).toStrictEqual(expect.stringContaining(target));
  });

  it('allows href rewriting', () => {
    expect(
      convert('[text](url/)', {
        linkRewrite: (href) => {
          return `http://example.com/${href}`;
        },
      }),
    ).toBe('[text|http://example.com/url/]');
  });
});
