import { Compatible } from 'unified/lib';

import { parse } from './parser';
import { print } from './utils/print';
import { render } from './utils/toHtml';

// The input string to tokenize

const input = '**This is bold text';

const parsed = parse(input);
// print(parsed);
const html = render(parsed);
// console.log(html);
