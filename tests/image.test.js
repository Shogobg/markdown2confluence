const convert = require('..');
const getTestStrings = require('./utils/testStringLoader');

describe('Image tests', () => {
  it('Simple image', () => {
    const {source, target} = getTestStrings('image');

    expect(convert(source)).toStrictEqual(expect.stringContaining(target));
  });

  it('Image with referenced link', () => {
    const {source, target} = getTestStrings('imageReference');

    expect(convert(source)).toStrictEqual(expect.stringContaining(target));
  });

  it('Change image URL renderer', () => {
    expect(
      convert('![alt text](image.png)', {
        renderer: {
          image: (href) => {
            return `http://example.com/${href}`;
          },
        },
      }),
    ).toBe('http://example.com/image.png\n\n');
  });
});
