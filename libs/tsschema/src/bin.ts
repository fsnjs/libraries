import { readFileSync } from 'fs';
import { resolve } from 'path';
import { JsdocTokenizer } from './jsdoc-tokenizer.js';
import { JsdocParser } from './parse.js';

const sourcePath = resolve('../tsnode/src/schema/fsn-package.schema.ts');
const source = readFileSync(sourcePath, 'utf-8');

const { tokens } = new JsdocTokenizer(source, sourcePath).tokenize();
new JsdocParser(tokens).tokenize();
