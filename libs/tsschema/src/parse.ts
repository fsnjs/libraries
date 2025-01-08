import { Tokenizer } from '@fsnjs/tokenize';
import { JToken, JTokenType } from './jsdoc-tokenizer.js';

export class JsdocParser extends Tokenizer<JToken, any> {
    constructor(tokens: JToken[]) {
        super(tokens);
    }

    override onNextToken(next: JToken) {
        if (next.type === JTokenType.COMMENT_OPEN) {
            console.log(next);
            // next = this.shift();
            // const comment = this._parseComment();
            // if (next.type === JTokenType.KEYWORD) {
            //     this.consume().while((val) => val.type === JTokenType.KEYWORD);
            //     const val = this.shift();
            //     console.log(val);
            // }
            // const type = this.consume().until(
            //     (val) => val.type === JTokenType.SEMI_COLON
            // );
            // console.log(type);
            // this.shift(); // Shift the comment close token
            // next = this.shift();
            // let declaration: JToken[] | undefined;
            // if (next.type === JTokenType.KEYWORD) {
            //     declaration = this.consume().until(
            //         (val) => val.type === JTokenType.BRACE
            //     );
            //     this.shift(); // Shift the closing brace
            //     next = this.shift();
            // }
            // if (next.type === JTokenType.COMMENT_OPEN) {
            //     console.log({
            //         comment,
            //         declaration
            //     });
            //     return;
            // }
            // const context = this.consume(next).until(
            //     (val) => val.type === JTokenType.SEMI_COLON
            // );
            // console.log({
            //     comment,
            //     declaration,
            //     context
            // });
        }
    }

    // private _parseComment() {
    //     let description: string | undefined;
    //     let defaultVal: string | undefined;
    //     let optional = false;

    //     const consumeLine = (next?: JToken) =>
    //         this.consume(next).until(
    //             (val) =>
    //                 val.type === JTokenType.DIRECTIVE ||
    //                 val.type === JTokenType.COMMENT_CLOSE
    //         );

    //     while (true) {
    //         let next = this.shift();

    //         if (next.type === JTokenType.COMMENT_CLOSE) {
    //             return defaultVal === undefined
    //                 ? { description, optional }
    //                 : { description, default: defaultVal, optional };
    //         }

    //         if (!description && next.type === JTokenType.STRING) {
    //             description = consumeLine(next)
    //                 .map((val) => val.value)
    //                 .join(' ');
    //             continue;
    //         }

    //         if (next.type === JTokenType.DIRECTIVE) {
    //             const directiveVal = consumeLine();

    //             if (next.value === '@default') {
    //                 console.log(next);

    //                 defaultVal = directiveVal
    //                     .map((val) => {
    //                         return val.value;
    //                     })
    //                     .join('');
    //             }

    //             if (next.value === '@optional') {
    //                 optional = true;
    //             }
    //         }
    //     }
    // }
}
