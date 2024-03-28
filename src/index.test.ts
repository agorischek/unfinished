import { expect, it } from 'bun:test';

it('should complete strong', () => {
  expect('**Hello').toGenerateHtml('<strong>Hello</strong>');
});

it('should complete inline code', () => {
  expect('`npm t').toGenerateHtml('<code>npm t</code>');
});
