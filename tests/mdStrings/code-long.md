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

  it('Codespan brackets', () => {
    const {source, target} = getTestStrings('codespan-brackets');
    expect(convert(source)).toStrictEqual(expect.stringContaining(target));
  });

  it('Code HTML', () => {
    // The markdown processing treats this as NOT HTML, so it is
    // going to escape the & into &amp; first.
    const {source, target} = getTestStrings('code-html');
    expect(convert(source)).toStrictEqual(expect.stringContaining(target));
  });
});
```
