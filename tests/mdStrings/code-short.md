```JavaScript
const convert = require('..');
const getTestStrings = require('./utils/testStringLoader');

describe('Code tests', () => {
  it('Format with code fences', () => {
    const {source, target} = getTestStrings('code-fence');
    expect(convert(source)).toStrictEqual(expect.stringContaining(target));
  });

  it('Format with code indentation', () => {
    const {source, target} = getTestStrings('code-indentation');
    expect(convert(source)).toStrictEqual(expect.stringContaining(target));
  });
});
```
