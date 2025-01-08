export interface PackageJSON {
    name: string;
    version: string;
    description: string;
    main: string;
    type: string;
    workspaces?: string[];
    scripts: { [scriptName: string]: string };
    author: string;
    license: string;
    devDependencies?: { [depName: string]: string };
    dependencies?: { [depName: string]: string };
    localDependencies?: { [depName: string]: string };
}
