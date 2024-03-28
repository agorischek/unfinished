import type { CstElement, CstNode, IToken } from 'chevrotain';
import type { PhrasingContent, Root, RootContent } from 'mdast';

import { isCstNode } from './utils/isCstNode';
import { print } from './utils/print';

export function project(el: CstElement): Root {
  if (!isCstNode(el)) throw 'Invalid input';
  // throw new Error(JSON.stringify(el, null, 2));
  // const doc = el.children.document[0];
  // if (!isCstNode(doc)) throw 'Invalid input';
  return projectDocument(el);
}

function projectDocument(doc: CstNode): Root {
  return new RootNode(doc);
}

function projectDocumentContent(content: CstElement): RootContent {
  // If the content is an IToken, create a new TextNode.
  if (!isCstNode(content)) return new TextNode(content);
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
  // If the content is an IToken, create a new TextNode.
  if (!isCstNode(content)) return new TextNode(content);
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
    const firstChild = node.children.InlineCode[0];
    const value = isCstNode(firstChild) ? '' : firstChild.image;
    this.value = value;
  }
}

export class TextNode {
  readonly type = 'text';
  readonly value: string;
  constructor(el: CstElement) {
    if (isCstNode(el)) {
      const firstChild = el.children.Text[0];
      if (firstChild && !isCstNode(firstChild)) {
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

// export function project(el: CstElement): RootContent[] {
//   // if (el === undefined) return [];

//   if (isCstNode(el)) {
//     if (el.name === 'document') {
//       return Object.values(el.children).flat().flatMap(project);
//     } else {
//       return projectPhrasing(el);
//     }
//   } else {
//     return [
//       {
//         type: 'text',
//         value: el.image,
//       },
//     ];
//   }
// }

// function projectPhrasing(cst: CstElement): PhrasingContent[] {
//   if (isCstNode(cst)) {
//     if (cst.name === 'boldText') {
//       return [
//         {
//           type: 'strong',
//           children: cst.children.textContent.flatMap(projectPhrasing),
//         },
//       ];
//     } else if (cst.name === 'inlineCode') {
//       // throw cst.children.InlineCode;
//       return [
//         {
//           type: 'inlineCode',
//           value: cst.children.InlineCode,
//         },
//       ];
//     } else if (cst.name === 'textContent') {
//       return cst.children.Text.map((child: CstElement) => {
//         if (!isCstNode(child)) {
//           return {
//             type: 'text',
//             value: child.image,
//           };
//         } else {
//           throw new Error(`Unknown node type: ${child.name}`);
//         }
//       });
//     } else {
//       throw new Error(`Unknown node type: ${cst.name}`);
//     }
//   } else {
//     return [
//       {
//         type: 'text',
//         value: cst.image,
//       },
//     ];
//   }
// }
