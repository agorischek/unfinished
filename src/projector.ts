import { CstElement, CstNode, IToken } from 'chevrotain';
import { RootContent } from 'mdast';
import { PhrasingContent } from 'mdast-util-from-markdown/lib';

export function project(cst: CstElement): RootContent[] {
  if (isCstNode(cst)) {
    if (cst.name === 'document') {
      // Flatten the arrays of children and map over them
      return Object.values(cst.children).flat().map(project).flat();
    } else if (cst.name === 'boldText') {
      // Map over the 'textContent' children
      return [
        {
          type: 'strong',
          children: cst.children.textContent.flatMap(projectPhrasing),
        },
      ];
    } else if (cst.name === 'textContent') {
      // Map over the 'Text' children
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

function isCstNode(element: CstElement): element is CstNode {
  return (element as CstNode).name !== undefined;
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
