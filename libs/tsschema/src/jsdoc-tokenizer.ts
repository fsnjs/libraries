import { StringTokenizer } from '@fsnjs/tokenize';

export enum JTokenType {
    BRACE,
    COMMENT_CLOSE,
    COMMENT_OPEN,
    DIRECTIVE,
    KEYWORD,
    PUNCTUATION,
    SEMI_COLON,
    STAR,
    STRING
}

export declare interface JToken {
    type: JTokenType;
    value: string;
    position: number;
}

export class JsdocTokenizer extends StringTokenizer<JToken> {
    constructor(raw: string, path: string) {
        super(raw, path, {
            wordRegex: /[a-z]|_|-|\.|`|"|'|\$|\/|\\|:|\d|\[|\]|\(|\)|@/i
        });
    }

    override onNextToken(val: string): any {
        if (val === '@') {
            const value = this.consumeWord(val);
            if (value.length > 1) {
                return this.pushToken('DIRECTIVE', value);
            }
        }

        if (val === ';') {
            return this.pushToken('SEMI_COLON', val);
        }

        if (val === '{' || val === '}') {
            return this.pushToken('BRACE', val);
        }

        if (val === '/' && this.peek() === '*') {
            const open = this.consume(val).until((val) => val !== '*');
            return this.pushToken('COMMENT_OPEN', open);
        }

        if (val === '*' && this.peek() === '/') {
            const value = val + this.shift();
            return this.pushToken('COMMENT_CLOSE', value);
        }

        if (this.isWord(val)) {
            const value = this.consumeWord(val);
            if (/export|declare|interface|type/i.test(value))
                return this.pushToken('KEYWORD', value);
            return this.pushToken('STRING', value);
        }
    }

    public pushToken(type: keyof typeof JTokenType, value: string) {
        this.tokens.push({
            type: JTokenType[type],
            value,
            position: this.position
        });
    }
}
