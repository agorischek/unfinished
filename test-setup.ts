import { expect } from 'bun:test';

import { toBeToken } from './src/utils/toBeToken';
import { toGenerateHtml } from './src/utils/toGenerateHtml';

declare module 'bun:test' {
  interface Matchers<T> {
    toGenerateHtml(html: string): any;
    toBeToken(tokenType: string, image: string): any;
  }
}

expect.extend({ toGenerateHtml, toBeToken });
