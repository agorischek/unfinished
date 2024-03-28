import type { CstElement, CstNode, IToken } from 'chevrotain';

export function isCstNode(element: CstElement): element is CstNode {
  return typeof element === 'object' && 'name' in element;
}

export function isParent(element: CstElement): element is CstNode {
  return typeof element === 'object' && 'name' in element;
}

export function isToken(element: CstElement): element is IToken {
  return typeof element === 'object' && 'image' in element;
}
