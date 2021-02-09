const {options} = require('marked');
const marked = require('marked');
const qs = require('querystring');

const defaultLanguageMap = require('./defaultLanguageMap.json');

const codeBlockParams = {
  options: {
    title: 'none',
    language: 'none',
    borderStyle: 'solid',
    theme: 'RDark', // dark is good
    linenumbers: true,
    collapse: true,
  },

  get(lang) {
    const codeOptions = this.options;
    codeOptions.language = lang;

    return codeOptions;
  },
};

const defaultRenderer = {
  /**
   * Simple text.
   *
   * @param {string} text
   * @return {string}
   */
  text: function (text) {
    return text;
  },
  /**
   * A paragraph of text.
   *
   * @param {string} text
   * @return {string}
   */
  paragraph: function (text) {
    return `${text}\n\n`;
  },
  /**
   * Embedded HTML.
   *
   *   <h1>My text</h1>
   *
   * turns into
   *
   *   h1. My text
   *
   * @param {string} text
   * @return {string}
   */
  html: function (text) {
    const regex = /<([\w]+)\s*[\w=]*"?([\/:\s\w=\-@\.\&\?\%]*)"?>([\/:\s\w.!?\\<>\-]*)(<\/\1>)?/gi;

    // We need special handling for anchors
    text = text.replace(regex, (match, tag, link, content) => {
      if (tag === 'a') {
        return `[${link}|`;
      }

      return `${tag}. ${content}`;
    });

    // Closing anchor tag </a> otherwise remove the closing tag
    text = text.replace(/<\/([\s\w]+)>/gi, (match, tag) => {
      if (tag === 'a') {
        return `]`;
      }

      return '';
    });

    return text;
  },
  /**
   * Headings 1 through 6.
   *
   *   Heading 1
   *   =========
   *
   *   # Heading 1 alternate
   *
   *   ###### Heading 6
   *
   * turns into
   *
   *   h1. Heading 1
   *
   *   h1. Heading 1 alternate
   *
   *   h6. Heading 6
   *
   * @param {string} text
   * @param {number} level
   * @return {string}
   */
  heading: function (text, level) {
    return `h${level}. ${text}\n\n`;
  },
  /**
   * Creates strong text.
   *
   *   This is typically **bolded**.
   *
   * becomes
   *
   *   This is typically *bolded*.
   *
   * @param {string} text
   * @return {string}
   */
  strong: function (text) {
    return `*${text}*`;
  },
  /**
   * Emphasis.
   *
   *   Typically this is *italicized* text.
   *
   * turns into
   *
   *   Typically this is _italicized_ text.
   *
   * @param {string} text
   * @return {string}
   */
  em: function (text) {
    return `_${text}_`;
  },
  /**
   * Strikethrough.
   *
   *   Supported ~~everywhere~~ in GFM only.
   *
   * turns into
   *
   *   Supported -everywhere- in GFM only.
   *
   * @param {string} text
   * @return {string}
   */
  del: function (text) {
    return `-${text}-`;
  },
  /**
   * Inline code.
   *
   *   Text that has statements, like `a = true` or similar.
   *
   * turns into
   *
   *   Text that has statements, like {{a = true}} or similar.
   *
   * Be wary. This converts wrong: "Look at `~/file1` or `~/file2`"
   * Confluence thinks it is subscript and converts the markup into
   * "Look at <code><sub>/file1</code> or <code></sub>/file2</code>".
   * That's why some characters need to be escaped.
   *
   * @param {string} text
   * @return {string}
   */
  codespan: function (text) {
    text = text.split(/(&[^;]*;)/).map((match, index) => {
      // These are the delimeters.
      if (index % 2) {
        return match;
      }

      return match.replace(/[^a-zA-Z0-9 ]/g, (badchar) => {
        return `&#${badchar[0].charCodeAt(0)};`;
      });
    });

    return `{{${text.join('')}}}`;
  },
  /**
   * Blockquote.
   *
   *   > This is a blockquote.
   *
   * is changed into
   *
   *   {quote}
   *   This is a blockquote.
   *   {quote}
   *
   * @param {string} text
   * @return {string}
   */
  blockquote: function (text) {
    return `{quote}\n${text.trim()}\n{quote}\n\n`;
  },
  /**
   * A line break.
   * This is triggered by having a backslash at the end of a row
   * Some text\
   *
   * @return {string}
   */
  br: function () {
    return '\n';
  },
  /**
   * Horizontal rule.
   *
   *   ---
   *
   * turns into
   *
   *   ----
   *
   * @return {string}
   */
  hr: function () {
    return '----\n\n';
  },
  /**
   * Link to another resource.
   *
   *   [Home](/)
   *   [Home](/ "some title")
   *
   * turns into
   *
   *   [Home|/]
   *   [some title|/]
   *
   * @param {string} href
   * @param {string} title
   * @param {string} text
   * @return {string}
   */
  link: function (href, title, text) {
    // Sadly, one must choose if the link's title should be displayed
    // or the linked text should be displayed. We picked the linked text.
    text = text || title;

    if (text) {
      text += '|';
    }

    return `[${text}${href}]`;
  },
  /**
   * Converts a list.
   *
   *     # ordered
   *         * unordered
   *
   * becomes
   *
   *     # ordered
   *     #* unordered
   *
   * Note: This adds an extra "\r" before the list in order to cope
   * with nested lists better. When there's a "\r" in a nested list, it
   * is translated into a "\n". When the "\r" is left in the converted
   * result then it is removed.
   *
   * @param {string} text
   * @param {boolean} ordered
   * @return {string}
   */
  list: function (text, ordered) {
    text = text.trim();

    if (ordered) {
      text = text.replace(/^\*/gm, '#');
    }

    return `\r${text}\n\n`;
  },
  /**
   * Changes a list item. Always marks it as an unordered list, but
   * list() will change it back.
   *
   * @param {string} text
   * @return {string}
   */
  listitem: function (text) {
    // If a list item has a nested list, it will have a "\r" in the
    // text. Turn that "\r" into "\n" but trim out other whitespace
    // from the list.
    text = text.replace(/\s*$/, '').replace(/\r/g, '\n');

    // Convert newlines followed by a # or a * into sub-list items
    text = text.replace(/\n([*#])/g, '\n*$1');

    return `* ${text}\n`;
  },
  /**
   * An embedded image.
   *
   *   ![alt-text](image-url)
   *
   * is changed into
   *
   *   !image-url!
   *
   * Markdown supports alt text and titles. Confluence does not.
   *
   * @param {string} href
   * @return {string}
   */
  image: function (href) {
    return `!${href}!`;
  },
  /**
   * Renders a table. Most of the work is done in tablecell.
   *
   * @param {string} header
   * @param {string} body
   * @return {string}
   */
  table: function (header, body) {
    return `${header}${body}\n`;
  },
  /**
   * Converts a table row. Most of the work is done in tablecell, however
   * that can't tell if the cell is at the end of a row or not. Get the
   * first cell's leading boundary and remove the double-boundary marks.
   *
   * @param {string} text
   * @return {string}
   */
  tablerow: function (text) {
    var boundary;

    boundary = text.match(/^\|*/);

    if (boundary) {
      boundary = boundary[0];
    } else {
      boundary = '|';
    }

    return `${text}${boundary}\n`;
  },
  /**
   * Converts a table cell. When this is a header, the cell is prefixed
   * with two bars instead of one.
   *
   * @param {string} text
   * @param {Object} flags
   * @return {string}
   */
  tablecell: function (text, flags) {
    var boundary;

    if (flags.header) {
      boundary = '||';
    } else {
      boundary = '|';
    }

    return `${boundary}${text}`;
  },
  /**
   * Code block.
   *
   *   ```js
   *   // JavaScript code
   *   ```
   *
   * is changed into
   *
   *   {code:language=javascript|borderStyle=solid|theme=RDark|linenumbers=true|collapse=true}
   *   // JavaScript code
   *   {code}
   *
   * @param {string} text
   * @param {string} lang
   * @return {string}
   */
  code: function (text, lang) {
    lang = defaultLanguageMap[(lang ?? '').toLowerCase()];

    const param = qs.stringify(codeBlockParams.get(lang), '|', '=');
    return `{code:${param}}\n${text}\n{code}\n\n`;
  },
};

const markdown2confluence = (markdown, options) => {
  if (options) {
    const {codeBlock, renderer} = options;

    if (codeBlock && codeBlock.languageMap) {
      Object.entries(codeBlock.languageMap).forEach((option) => {
        defaultLanguageMap[option[0]] = option[1];
      });
    }

    if (codeBlock && codeBlock.options) {
      Object.entries(codeBlock.options).forEach((option) => {
        if (
          codeBlockParams.options[option[0]] &&
          typeof option[1] !== 'function'
        ) {
          codeBlockParams.options[option[0]] = option[1];
        }
      });
    }

    if (renderer) {
      Object.entries(renderer).forEach((option) => {
        if (defaultRenderer[option[0]] && typeof option[1] === 'function') {
          defaultRenderer[option[0]] = option[1];
        }
      });
    }
  }

  marked.use({renderer: defaultRenderer});

  return marked(markdown.toString());
};

module.exports = markdown2confluence;
