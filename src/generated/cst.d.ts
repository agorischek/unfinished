import type { CstNode, ICstVisitor, IToken } from "chevrotain";

export interface ContentCstNode extends CstNode {
  name: "content";
  children: ContentCstChildren;
}

export type ContentCstChildren = {
  boldText?: BoldTextCstNode[];
  inlineCode?: InlineCodeCstNode[];
  text?: TextCstNode[];
};

export interface BoldTextCstNode extends CstNode {
  name: "boldText";
  children: BoldTextCstChildren;
}

export type BoldTextCstChildren = {
  DoubleAsterisk: (IToken)[];
  text: TextCstNode[];
};

export interface InlineCodeCstNode extends CstNode {
  name: "inlineCode";
  children: InlineCodeCstChildren;
}

export type InlineCodeCstChildren = {
  OpeningBacktick: IToken[];
  text: TextCstNode[];
  ClosingBacktick: IToken[];
};

export interface TextCstNode extends CstNode {
  name: "text";
  children: TextCstChildren;
}

export type TextCstChildren = {
  Text: IToken[];
};

export interface ICstNodeVisitor<IN, OUT> extends ICstVisitor<IN, OUT> {
  content(children: ContentCstChildren, param?: IN): OUT;
  boldText(children: BoldTextCstChildren, param?: IN): OUT;
  inlineCode(children: InlineCodeCstChildren, param?: IN): OUT;
  text(children: TextCstChildren, param?: IN): OUT;
}
