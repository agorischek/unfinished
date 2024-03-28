import { createToken } from 'chevrotain';

export const Strong = createToken({
  name: 'Strong',
  pattern: /\*\*/,
});

export const Text = createToken({
  name: 'Text',
  pattern: /[^*]+/,
});
