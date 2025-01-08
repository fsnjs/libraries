// @ts-check

/** @typedef {{ name: string, pkg?: string[], deflt?: string[] }} Import */

import { readFileSync } from 'fs';
import { globSync } from 'glob';
import { resolve } from 'path';

/** @type {{ [name: string]: { deflt: Set<string>, pkg: Set<string> } }} */
const $from = {};

const body = [];

const tsFilePaths = globSync(resolve('libs', 'tsnode', 'src', '**/*.ts'));
const tsFiles = tsFilePaths
    .map((f) => ({
        path: f,
        source: readFileSync(f, 'utf-8').split(/\n/g)
    }))
    .map(({ path, source: lines }) => {
        const imports = [];
        const body = [];

        let ln = lines.shift();
        while (ln !== undefined) {
            if (ln.trim().startsWith('import')) {
                if (ln.endsWith(';')) {
                    imports.push(ln);
                    ln = lines.shift();
                    continue;
                }

                let stmt = ln;
                while (!stmt.endsWith(';')) {
                    ln = lines.shift();
                    if (!ln) throw 'Import stmt not terminated.';
                    stmt += ln;
                }
                imports.push(stmt);
                ln = lines.shift();
                continue;
            }

            body.push(ln);
            ln = lines.shift();
        }

        imports.forEach((imported) => {
            const { name, deflt, pkg } = processImport(imported);
            $from[name] ??= { deflt: new Set(), pkg: new Set() };
            deflt?.forEach((d) => {
                if (d.length > 0) $from[name].deflt.add(d);
            });
            pkg?.forEach((p) => {
                if (p.length > 0) $from[name].pkg.add(p);
            });
        });
    });

console.log($from);

/**
 * @param {string} i
 * @returns { Import }
 */
function processImport(i) {
    let from = i.indexOf('from');

    let name = i.substring(from + 'from'.length);

    let deflt = i.substring(i.indexOf('import') + 'import'.length, from).trim();

    if (!deflt.includes('{')) return { name, deflt: deflt.split(/,/g) };

    // Split out the package imports
    let pkg = deflt
        .substring(deflt.indexOf('{'), deflt.indexOf('}') + 1)
        .trim();
    // Remove the package imports from the default imports
    deflt = deflt.replace(pkg, '').trim();
    // Remove the braces from the package imports
    pkg = pkg.substring(pkg.indexOf('{') + 1, pkg.indexOf('}')).trim();

    /** @type { Import } */
    let imports = { name };

    if (pkg.length > 0) imports.pkg = pkg.split(/,/g);
    if (deflt.length > 0) imports.deflt = deflt.split(/,/g);

    return imports;
}
