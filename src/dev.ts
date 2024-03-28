import { fromMarkdown } from 'mdast-util-from-markdown';

import { parse } from './parser';
import { print } from './utils/print';
import { render } from './utils/render';

// The input string to tokenize

const input = '#';

const tree = fromMarkdown(input);

print(tree);

// const parsed = parse(input);
// // print(parsed);
// const html = render(parsed);
// // console.log(html);
