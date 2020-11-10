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

  // More code tests
  it("uses the language map (lowercased) and code styling options", () => {
    expect(convert("```Moo\ncow()```", {
        codeLanguageMap: {
            moo: "cowspeak"
        },
        codeStyling: {
            anything: "goes_here"
        }
    })).toBe(`{code:anything=goes_here|language=cowspeak}
cow()
{code}`);
});
  it("allows 20 lines before collapsing", () => {
      expect(convert("```\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n```", {
          codeStyling: {}
      })).toBe("{code:language=none}\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n{code}");
  });
  it("collapses when too big", () => {
      expect(convert("```\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n```", {
          codeStyling: {}
      })).toBe("{code:language=none|collapse=true}\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n{code}");
  });
  it("collapses at a set number", () => {
      expect(convert("```\n1\n2\n3\n```", {
          codeStyling: {},
          codeCollapseAt: 2
      })).toBe("{code:language=none|collapse=true}\n1\n2\n3\n{code}");
  });

  // Codespan tests
  it("changes unsafe text so Confluence understands it", () => {
    expect(convert("`~/file` and `~/folder` and `{braces}`")).toBe("{{&#126;&#47;file}} and {{&#126;&#47;folder}} and {{&#123;braces&#125;}}");
  });
  it("preserves entities that are already HTML encoded", () => {
      expect(convert("`Fish&Chips`")).toBe("{{Fish&amp;Chips}}");
      expect(convert("`> and <`")).toBe("{{&gt; and &lt;}}");
  });
  it("is a bit strange here", () => {
      // The markdown processing treats this as NOT HTML, so it is
      // going to escape the & into &amp; first.
      expect(convert("`it&#38;s`")).toBe("{{it&amp;&#35;38&#59;s}}");
  });
});
