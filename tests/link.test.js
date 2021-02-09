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

  it('Change anchor URL renderer', () => {
    expect(
      convert('[text](url/)', {
        renderer: {
          link: (href) => {
            return `http://example.com/${href}`;
          },
        },
      }),
    ).toBe('http://example.com/url/\n\n');
  });
});
