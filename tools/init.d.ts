import { PackageJSON } from './types.js';

export declare interface DepTree {
    [libName: string]: {
        path: string;
        manifest: PackageJSON;
        workspaceDeps?: {
            [depName: string]: string;
        };
    };
}

export declare function buildDepTree(projectRoot: string): void;
