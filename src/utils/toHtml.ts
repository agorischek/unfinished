import { toHtml } from 'hast-util-to-html';
import { RootContent } from 'mdast';
import { toHast } from 'mdast-util-to-hast';

export const render = (items: RootContent[]) => {
  const tree = {
    type: 'root',
    children: items,
  } as const;
  const hastTree = toHast(tree);
  const html = toHtml(hastTree);
  return html;
};
