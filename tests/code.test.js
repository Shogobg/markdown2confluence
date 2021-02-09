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
  // More code tests
  it('Add new language to language map', () => {
    const {source, target} = getTestStrings('code-languagemap');
    expect(
      convert(source, {
        codeBlock: {
          languageMap: {
            leet: '1337',
          },
        },
      }),
    ).toStrictEqual(expect.stringContaining(target));
  });

  it("Don't collapse code", () => {
    const {source, target} = getTestStrings('code-not-collapsing');
    expect(
      convert(source, {
        codeBlock: {
          options: {
            collapse: false,
          },
        },
      }),
    ).toStrictEqual(expect.stringContaining(target));
  });

  // it('Collapses if longer than 20 lines', () => {
  //   const {source, target} = getTestStrings('code-collapsing-more-than-20');
  //   expect(convert(source)).toStrictEqual(expect.stringContaining(target));
  //   // {code:language=none|collapse=true}\n1\n2\n3\n{code}
  // });

  // it('Collapses at a set number of lines', () => {
  //   const {source, target} = getTestStrings(
  //     'code-collapsing-custom-number-lines',
  //   );
  //   expect(convert(source), {
  //     codeBlock: {
  //       collapseAfter: 2,
  //     },
  //   }).toStrictEqual(expect.stringContaining(target));
  //   // {code:language=none|collapse=true}\n1\n2\n3\n{code}
  // });

  // // Codespan tests
  // it('changes unsafe text so Confluence understands it', () => {
  //   expect(convert('`~/file` and `~/folder` and `{braces}`')).toBe(
  //     '{{&#126;&#47;file}} and {{&#126;&#47;folder}} and {{&#123;braces&#125;}}',
  //   );
  // });
  // it('preserves entities that are already HTML encoded', () => {
  //   expect(convert('`Fish&Chips`')).toBe('{{Fish&amp;Chips}}\n\n');
  //   expect(convert('`> and <`')).toBe('{{&gt; and &lt;}}\n\n');
  // });
});
