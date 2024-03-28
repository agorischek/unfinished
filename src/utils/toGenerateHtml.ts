import { CustomMatcher } from 'bun:test';

import { parse } from '../parser';
import { render } from './render';

export const toGenerateHtml: CustomMatcher<unknown, any[]> = (
  received,
  expected,
) => {
  if (typeof received !== 'string') throw new Error('received is not a string');
  const parsed = parse(received);
  const html = render(parsed);
  const pass = html === expected;

  if (pass) {
    return {
      message: () => `expected ${received} not to generate ${expected}`,
      pass: true,
    };
  } else {
    return {
      message: () =>
        `expected ${received} to generate ${expected}, but got ${html}`,
      pass: false,
    };
  }
};
