> task items are not converted

- [ ] Mercury
- [x] Venus
- [x] Earth (Orbit/Moon)
- [x] Mars
- [ ] Jupiter
- [ ] Saturn
- [ ] Uranus
- [ ] Neptune
- [ ] Comet Haley

> Images are not converted
> Emoji are not converted

> Markdown input || Expected Confluence output Actual || Confluence output
> `{hello} {world}` || `{{\{hello} \{world}}}` || `{{{hello} {world}}}`
> When the input Markdown contains `{` in a code span, the text is wrapped in `{{` `}}`, but Confluence also expects the inner `{` to be escaped with `\`. This produces a warning when inserted into Confluence:
>
> ```
> {{
> Unknown macro: {hello}
> Unknown macro: {world}
> }}
> ```

> Link text not converted
> [GitHub Flavored Markdown](https://github.github.com/gfm/)

> Horizontal line not rendering on a new line

# Input

## Hello

---

## World

# Expected

h1. Hello

---

h1. World

# Result

h1. Hello

----h1. World

> Nested list items not working

- item
  - nested

# expected

- item
  \*\* nested

# got

- item\* nested
