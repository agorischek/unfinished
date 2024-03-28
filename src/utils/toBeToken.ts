import type { CustomMatcher } from 'bun:test';

export const toBeToken: CustomMatcher<any, any[]> = (
  received,
  expectedTokenType,
  expectedImage,
) => {
  const pass =
    received.tokenType.name === expectedTokenType &&
    received.image === expectedImage;

  if (pass) {
    return {
      message: () =>
        `expected ${received} not to be a '${expectedTokenType}' token with image '${expectedImage}'`,
      pass: true,
    };
  } else {
    return {
      message: () =>
        `Expected '${expectedTokenType}' token with image '${expectedImage}' but got '${received.tokenType.name}' token with image '${received.image}'`,
      pass: false,
    };
  }
};
