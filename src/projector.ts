import type { CstElement, CstNode, IToken } from 'chevrotain';
import type { PhrasingContent, Root, RootContent } from 'mdast';

import { isParent, isToken } from './utils/elements';

export function project(el: CstElement): Root {
  if (isToken(el)) throw 'Invalid input';
  return projectDocument(el);
}

function projectDocument(doc: CstNode): Root {
  return new RootNode(doc);
}

function projectDocumentContent(content: CstElement): RootContent {
  // If the content is an IToken, create a new TextNode.
  if (isToken(content)) return new TextNode(content);
  else {
    // If the content is a CstNode, check its name.
    switch (content.name) {
      case 'boldText':
        return new StrongNode(content);
      case 'inlineCode':
        return new InlineCodeNode(content);
      case 'textContent':
        return new TextNode(content);
      default:
        throw new Error(`Unknown node type: ${content.name}`);
    }
  }
}

function projectPhrasingContent(content: CstElement): PhrasingContent {
  if (isToken(content)) return new TextNode(content);
  else {
    switch (content.name) {
      case 'boldText':
        return new StrongNode(content);
      case 'inlineCode':
        return new InlineCodeNode(content);
      case 'textContent':
        return new TextNode(content);
      default:
        throw new Error(`Unknown node type: ${content.name}`);
    }
  }
}

export class RootNode {
  readonly type = 'root';
  readonly children: RootContent[];
  constructor(node: CstNode) {
    this.children = Object.values(node.children)
      .flat()
      .map(projectDocumentContent);
  }
}

export class StrongNode {
  readonly type = 'strong';
  readonly children: PhrasingContent[];
  constructor(node: CstNode) {
    this.children = node.children.textContent.map(projectPhrasingContent);
  }
}

export class InlineCodeNode {
  readonly type = 'inlineCode';
  readonly value: string;
  constructor(node: CstNode) {
    const textContent = node.children.textContent[0];
    if (isParent(textContent)) {
      const text = textContent.children.Text[0];
      if (isParent(text)) {
        this.value = '';
      } else {
        this.value = text.image;
      }
    } else {
      this.value = textContent.image;
    }
  }
}

export class TextNode {
  readonly type = 'text';
  readonly value: string;
  constructor(el: CstElement) {
    if (isParent(el)) {
      const firstChild = el.children.Text[0];
      if (firstChild && isToken(firstChild)) {
        this.value = firstChild.image;
      } else {
        throw new Error('Invalid input');
      }
    } else {
      this.value = el.image;
    }
  }
}

// The following can be root content:
// blockquote: Blockquote;
// break: Break;
// code: Code;
// definition: Definition;
// delete: Delete;
// emphasis: Emphasis;
// footnoteDefinition: FootnoteDefinition;
// footnoteReference: FootnoteReference;
// heading: Heading;
// html: Html;
// image: Image;
// imageReference: ImageReference;
// inlineCode: InlineCode;
// link: Link;
// linkReference: LinkReference;
// list: List;
// listItem: ListItem;
// paragraph: Paragraph;
// strong: Strong;
// table: Table;
// tableCell: TableCell;
// tableRow: TableRow;
// text: Text;
// thematicBreak: ThematicBreak;
// yaml: Yaml;
