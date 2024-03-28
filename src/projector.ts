import type { CstElement } from 'chevrotain';
import type { PhrasingContent, RootContent } from 'mdast';

import { isCstNode } from './utils/isCstNode';

export function project(el: CstElement): RootContent[] {
  // if (el === undefined) return [];

  if (isCstNode(el)) {
    if (el.name === 'document') {
      return Object.values(el.children).flat().flatMap(project);
    } else {
      return projectPhrasing(el);
    }
  } else {
    return [
      {
        type: 'text',
        value: el.image,
      },
    ];
  }
}

function projectPhrasing(cst: CstElement): PhrasingContent[] {
  if (isCstNode(cst)) {
    if (cst.name === 'boldText') {
      return [
        {
          type: 'strong',
          children: cst.children.textContent.flatMap(projectPhrasing),
        },
      ];
    } else if (cst.name === 'textContent') {
      return cst.children.Text.map((child: CstElement) => {
        if (!isCstNode(child)) {
          return {
            type: 'text',
            value: child.image,
          };
        } else {
          throw new Error(`Unknown node type: ${child.name}`);
        }
      });
    } else {
      throw new Error(`Unknown node type: ${cst.name}`);
    }
  } else {
    return [
      {
        type: 'text',
        value: cst.image,
      },
    ];
  }
}
