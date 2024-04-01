import type {
  InlineCode as InlineCodeNode,
  Root as RootNode,
  Strong as StrongNode,
  Text as TextNode,
} from 'mdast';

import type { ContentCstNode } from './generated/cst';
import { parser } from './parser';

const BaseCstVisitor = parser.getBaseCstVisitorConstructor();

export class MdastVisitor extends BaseCstVisitor {
  constructor() {
    super();
    this.validateVisitor();
  }

  content(ctx: ContentCstNode): RootNode {
    console.log(ctx);
    return {
      type: 'root',
      children: ctx.children?.text?.map((text) => this.visit(text)) ?? [],
    };
  }

  inlineCode(ctx: any): InlineCodeNode {
    return {
      type: 'inlineCode',
      value: ctx.text[0].image,
    };
  }

  boldText(ctx: any): StrongNode {
    return {
      type: 'strong',
      children: [this.visit(ctx.text[0])],
    };
  }

  text(ctx: any): TextNode {
    return {
      type: 'text',
      value: ctx.Text[0].image,
    };
  }
}

export const visitor = new MdastVisitor();
