import type { CstElement, CstNode } from 'chevrotain';

export function isCstNode(element: CstElement): element is CstNode {
  return typeof element === 'object' && 'name' in element;
}
