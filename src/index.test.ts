import { expect, it } from 'bun:test';

import { parse } from './parser';
import { render } from './utils/render';

it('should complete strong', () => {
  expect('**Hello').toGenerateHtml('<strong>Hello</strong>');
});

// it('should complete inline code', () => {
//   const content = '`npm t';
//   const parsed = parse(content);
//   const html = render(parsed);
//   expect(html).toBe('<code>npm t</code>');
// });
