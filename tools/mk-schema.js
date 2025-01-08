// @ts-check

import { readFileSync } from 'fs';
import { resolve } from 'path';

function split() {
    const source = readFileSync(
        resolve('./fsn-project.schema.ts'),
        'utf-8'
    ).split(/\n/g);

    const blocks = [];
    const block = [];

    function resetBlock() {
        if (block.length > 0) blocks.push([...block]);
        block.length = 0;
    }

    let line = source.shift();
    while (line !== undefined) {
        if (line.startsWith('/**')) resetBlock();

        block.push(line);
        line = source.shift();
    }
    resetBlock();

    return blocks;
}

/** @param {string[]} fn */
function separate(fn) {
    fn.shift();

    const splitIndex = fn.findIndex((i) => /\*\/$/.test(i));
    let comment = fn
        .splice(1, splitIndex)
        .map((row) => row.trim().slice(1).trim())
        .filter((val) => val.length > 0);

    let description = fn.shift()?.trim();
    if (!description) return {};
    description = description.substring(1).trim();
    comment = comment.filter((c) => c.startsWith('@prop'));

    return {
        description,
        comment,
        fn
    };
}

/** @param {string} property */
function parseProp(property) {
    let type;

    const tokens = [...property];
    let token;
    while ((token = tokens.shift())) {
        if (token === '{') {
            type = processOpenClose();
        }
    }

    function processOpenClose() {
        let inner = '';

        while (true) {
            token = tokens.shift();

            if (token === '}') {
                console.log(inner);
                return inner;
            }

            if (token === '{') {
                inner += processOpenClose();
                continue;
            }

            inner += token;
        }
    }

    return { type };

    // let tokens = property.split(/\s/g);
    // tokens.shift();

    // const type = tokens.shift();
    // const name = tokens.shift();
    // // const doc = parseDesc();

    // return { type, name };

    // return { type, name, doc };

    // function parseDesc() {
    //     /** @type {string[]} */
    //     let desc = [];

    //     while (true) {
    //         let token = tokens.shift();
    //         if (!token) return { description: desc.join(' ') };
    //         if (token === '(default:') {
    //             let deflt = tokens.shift();
    //             if (!deflt) return { description: desc.join(' ') };
    //             return {
    //                 description: desc.join(' '),
    //                 defaultVal: parseDefault(deflt)
    //             };
    //         }
    //         desc.push(token);
    //     }
    // }

    // /** @param {string} defaultVal */
    // function parseDefault(defaultVal) {
    //     if (!defaultVal.includes('`')) {
    //         return defaultVal.substring(0, defaultVal.lastIndexOf(')') + 1);
    //     }

    //     return defaultVal.substring(
    //         defaultVal.indexOf('`') + 1,
    //         defaultVal.lastIndexOf('`')
    //     );
    // }
}

const segments = split();

segments.forEach((seg) => {
    const newSeg = separate(seg);
    if (!newSeg.comment) return;
    return newSeg.comment.map((c) => {
        const parsed = parseProp(c);
        console.log(parsed);
    });
});
