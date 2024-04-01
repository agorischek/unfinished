import type { CustomMatcher } from 'bun:test';
import chalk from 'chalk';

// import { diff } from 'jest-matcher-utils';
import { parse } from '../index';
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
      message: () =>
        [
          `Input: ${chalk.dim(`"${received}"`)}`,
          `Expected HTML: ${chalk.green(expected)}`,
          `Received HTML: ${chalk.red(html)}`,
        ].join('\n'),
      pass: true,
    };
  } else {
    return {
      message: () =>
        [
          `Input: ${chalk.dim(`"${received}"`)}`,
          `Expected HTML: ${chalk.green(expected)}`,
          `Received HTML: ${chalk.red(html)}`,
        ].join('\n'),
      pass: false,
    };
  }
};
