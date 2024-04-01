import { generateCstDts } from 'chevrotain';
import { join } from 'desm';

import { parser } from '../src/parser.js';

const productions = parser.getGAstProductions();
const code = generateCstDts(productions);
const path = join(import.meta.url, '..', 'src/generated', 'cst.d.ts');

await Bun.write(path, code);
