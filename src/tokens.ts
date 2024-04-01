import { createToken } from 'chevrotain';

export const Asterisk = createToken({
  name: 'Asterisk',
  pattern: /\*/,
});

export const DoubleAsterisk = createToken({
  name: 'DoubleAsterisk',
  pattern: /\*\*/,
});

export const Text = createToken({
  name: 'Text',
  pattern: /[^*`]+/,
});

export const OpeningBacktick = createToken({
  name: 'OpeningBacktick',
  pattern: /\`/,
  push_mode: 'inlineCode',
});

export const ClosingBacktick = createToken({
  name: 'ClosingBacktick',
  pattern: /\`/,
  pop_mode: true,
});
