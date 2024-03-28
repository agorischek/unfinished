import { fromMarkdown } from 'mdast-util-from-markdown';
import prettyFormat from 'pretty-format';
import Purdy from 'purdy';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

const doc = `
**A** **
`;

const tree = fromMarkdown(doc);

const condensed = extractNodeData(tree);

// console.log(prettyFormat(condensed));
Purdy(condensed, {
  depth: null,
  indent: 2,
});

function extractNodeData(node: any): any {
  let result: any = {};

  if (node.type) {
    result.type = node.type;
  }

  if (node.value) {
    result.value = node.value;
  }

  if (node.children) {
    result.children = node.children.map((child: any) => extractNodeData(child));
  }

  return result;
}

// Usage:
// const extractedData = extractNodeData(tree.children[0]);
// console.log(extractedData);
