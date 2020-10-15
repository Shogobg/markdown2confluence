const convert = require('..');

const pairs = [
  ['# h1', 'h1. h1\n\n'],
  ['head1\n===', 'h1. head1\n\n'],
  ['###  h3', 'h3. h3\n\n'],
];

describe('Sample Test', () => {
  pairs.forEach((arr, i) => {
    it(`should test that converting '${arr[0]}' results in '${arr[1]}'`, () => {
      expect(convert(arr[0])).toBe(arr[1]);
    });
  });
});
