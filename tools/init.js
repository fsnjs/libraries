// @ts-check

/** @typedef { import('./types.js').PackageJSON } PackageJSON **/
/** @typedef { import('./init.js').buildDepTree } buildDepTree **/

import { join, resolve } from 'path';
import { resolvePaths } from './util.js';
import { readPackageJson } from './util.js';

const { projects } = resolvePaths('libs');
const { resolved } = projects;

/** @type { { [path: string]: PackageJSON } } */
const libManifests = {};

/** @type { import('./init.js').DepTree } */
const depTree = {};

/** @type { buildDepTree } */
export function buildDepTree(projectRoot) {
    const manifestPath = resolve(projectRoot, 'package.json');
    const manifest = readPackageJson(manifestPath);

    if (manifest.localDependencies) {
        depTree;
        Object.entries(manifest.localDependencies ?? {}).forEach(
            ([name, path]) => {
                buildDepTree(path);
            }
        );
    }
}

resolved.forEach((p) => {
    const manifestPath = join(p, 'package.json');
    const manifest = readPackageJson(manifestPath);

    Object.entries(manifest.localDependencies ?? {}).forEach(
        ([depName, path]) => {
            path = join(manifestPath, path);
            depTree[depName] ??= {
                path,
                manifest: readPackageJson('')
            };
            depTree[depName] = {};
        }
    );

    depTree[manifest.name] = {
        path: manifestPath,
        manifest,
        localDependencies: manifest.localDependencies
    };
});

console.log(libManifests);

// Update the package.json if this is a local thing
// do it recursively, to take care of packages of packages,
// and run the build command for root dependencies
// Maybe build a dependency tree for local projects and then
// build in that order? Also NPM install. Woot, woot.
// Object.entries(packageJson.localDependencies).forEach(([dep, path]) => {
//     path = resolve(path, 'package.json');
//     const dependency = JSON.parse(readFileSync(path, 'utf-8'));
//     console.log(dependency);
// });
