/** @typedef { import('./util.js').resolvePaths } resolvePaths **/
/** @typedef { import('./util.js').readPackageJson } readPackageJson **/

import { readdirSync, readFileSync, statSync } from 'fs';
import { join, resolve } from 'path';

/** @type { resolvePaths } **/
export function resolvePaths(workspaceDir) {
    const root = resolve(workspaceDir);
    const projects = readdirSync(root);

    return {
        root,
        projects: {
            resolved: projects
                .map((p) => resolve('libs', p))
                .filter((p) => statSync(p).isDirectory()),
            relative: projects
                .map((p) => join('libs', p))
                .filter((p) => statSync(p).isDirectory())
        }
    };
}

/** @type { readPackageJson } */
export function readPackageJson(path) {
    const packageJson = readFileSync(path, 'utf-8');
    return JSON.parse(packageJson);
}
