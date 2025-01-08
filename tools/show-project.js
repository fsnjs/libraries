/**
 * @typedef { import('./show-project.js').VsCodeConfig } VsCodeConfig
 * @typedef {import('./init.js').buildDepTree} buildDepTree
 */

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { argv } from 'process';
import { readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { resolvePaths } from './util.js';

const { projects } = resolvePaths('libs');
const { relative } = projects;

const configPath = resolve('.vscode', 'settings.json');

/** @type { VsCodeConfig } */
const vscodeConfig = (() => {
    const configRaw = readFileSync(configPath, 'utf-8');
    return JSON.parse(configRaw);
})();

const args = await yargs(hideBin(argv))
    .option('show', { type: 'array', choices: relative })
    .option('hide', { type: 'array', choices: relative })
    .option('all', { type: 'boolean', default: false })
    .parse();

if (args.show) {
    if (args.all) args.show = relative;
    args.show.forEach((l) => {
        l = join('libs', l);
        vscodeConfig['files.exclude'][l] = false;
    });
} else if (args.hide) {
    if (args.all) args.hide = relative;
    args.hide.forEach((l) => {
        l = join('libs', l);
        vscodeConfig['files.exclude'][l] = true;
    });
}

writeFileSync(configPath, JSON.stringify(vscodeConfig, null, 4));
