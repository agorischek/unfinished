import { toHtml } from 'hast-util-to-html';
import type { Root, RootContent } from 'mdast';
import { toHast } from 'mdast-util-to-hast';

export const render = (root: Root) => {
  // const tree = {
  //   type: 'root',
  //   children: items,
  // } as const;
  const hastTree = toHast(root);
  const html = toHtml(hastTree);
  return html;
};
