import { PackageJSON } from './types.js';

/**
 * Resolves workspace paths.
 * @param workspaceRoot The relative path to the workspace root directory
 * For multi-project workspaces, this will be the folder (i.e. `libs`) where
 * project folders are stored. For single-project workspaces, this will be
 * the location of the `package.json`.
 */
export declare function resolvePaths(workspaceRoot: string): {
    root: string;
    projects: {
        resolved: string[];
        relative: string[];
    };
};

/**
 * A parsed package.json file.
 * @param path The resolved path to a package.json
 */
export declare function readPackageJson(path: string): PackageJSON;
