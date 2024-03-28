import Purdy from 'purdy';

export const print = (input: object): void => {
  Purdy(input, {
    depth: null,
    indent: 2,
  });
};
