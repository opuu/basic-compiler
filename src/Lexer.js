// Lexical Analysis
class Lexer {
    constructor(code) {
        this.code = code;
        this.tokens = []; // [ { type: "keyword", value: "while", line: 1, col: 1 }, ... ]
        this.current = 0;

        this.keywords = ["while", "if", "else", "function", "return", "print"];

        this.numbers = "0123456789";

        this.letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

        this.punctuations = ["(", ")", "{", "}", "[", "]", ","];

        this.operations = ["+", "-", "*", "/", "%"];

        this.logical = ["&&", "||", "!"];

        this.compare = ["<", ">", "<=", ">=", "==", "!="];

        this.assignment = ["="];

        this.endofstatement = [";"];

        this.whitespace = [" ", "\n", "\t", "\r"];

        this.line = 1;
        this.col = 1;

        this.currentChar = this.code[this.current];
    }

    advance() {
        this.current++;
        this.col++;
        if (this.currentChar === "\n") {
            this.line++;
            this.col = 1;
        }
        this.currentChar = this.code[this.current];
    }

    addToken(type, value) {
        this.tokens.push({
            type,
            value,
            line: this.line,
            col: this.col,
        });
    }

    isComment() {
        if (this.currentChar === "/" && this.code[this.current + 1] === "/") {
            return true;
        } else if (
            this.currentChar === "/" &&
            this.code[this.current + 1] === "*"
        ) {
            return true;
        }
    }

    skipComment() {
        if (this.currentChar === "/" && this.code[this.current + 1] === "/") {
            while (this.currentChar !== "\n") {
                this.advance();
            }
        }
        if (this.currentChar === "/" && this.code[this.current + 1] === "*") {
            while (
                !(
                    this.currentChar === "*" &&
                    this.code[this.current + 1] === "/"
                )
            ) {
                this.advance();
            }

            this.advance();
            this.advance();
        }
    }

    isNumber() {
        return this.numbers.includes(this.currentChar);
    }

    isLetter() {
        return this.letters.includes(this.currentChar);
    }

    isKeyword(value) {
        if (value) {
            return this.keywords.includes(value);
        }
        return this.keywords.includes(this.currentChar);
    }

    isIdentifier() {
        return this.isLetter() || this.isNumber() || this.currentChar === "_";
    }

    isString() {
        return this.currentChar === '"';
    }

    isPunctuation() {
        return this.punctuations.includes(this.currentChar);
    }

    isOperation() {
        return this.operations.includes(this.currentChar);
    }

    isLogical() {
        return this.logical.includes(this.currentChar);
    }

    isCompare() {
        let nextChar = this.code[this.current + 1];
        let together = this.currentChar + nextChar;
        if (this.compare.includes(together)) {
            return true;
        } else if (this.compare.includes(this.currentChar)) {
            return true;
        } else {
            return false;
        }
    }

    isAssignment() {
        return this.assignment.includes(this.currentChar);
    }

    isEndOfStatement() {
        return this.endofstatement.includes(this.currentChar);
    }

    isWhitespace() {
        return this.whitespace.includes(this.currentChar);
    }

    isEnd() {
        return this.current >= this.code.length;
    }

    lexNumber() {
        let num = "";
        while (this.isNumber()) {
            num += this.currentChar;
            this.advance();
        }
        this.addToken("number", num);
    }

    lexIdentifier() {
        let id = "";

        while (this.isIdentifier()) {
            id += this.currentChar;
            this.advance();
        }

        if (this.isKeyword(id)) {
            this.addToken("keyword", id);
        } else {
            this.addToken("identifier", id);
        }
    }

    lexString() {
        let str = "";
        this.advance();
        while (!this.isString()) {
            str += this.currentChar;
            this.advance();
        }
        this.advance();
        this.addToken("string", str);
    }

    lexPunctuation() {
        this.addToken("punctuation", this.currentChar);
        this.advance();
    }

    lexOperation() {
        this.addToken("operation", this.currentChar);
        this.advance();
    }

    lexLogical() {
        this.addToken("logical", this.currentChar);
        this.advance();
    }

    lexCompare() {
        let nextChar = this.code[this.current + 1];
        let together = this.currentChar + nextChar;
        if (this.compare.includes(together)) {
            this.addToken("compare", together);
            this.advance();
            this.advance();
        } else {
            this.addToken("compare", this.currentChar);
            this.advance();
        }
    }

    lexAssignment() {
        this.addToken("assignment", this.currentChar);
        this.advance();
    }

    lexEndOfStatement() {
        this.addToken("endofstatement", this.currentChar);
        this.advance();
    }

    lex() {
        while (!this.isEnd()) {
            if (this.isComment()) {
                this.skipComment();
            } else if (this.isWhitespace()) {
                this.advance();
            } else if (this.isNumber()) {
                this.lexNumber();
            } else if (this.isLetter()) {
                this.lexIdentifier();
            } else if (this.isString()) {
                this.lexString();
            } else if (this.isPunctuation()) {
                this.lexPunctuation();
            } else if (this.isOperation()) {
                this.lexOperation();
            } else if (this.isLogical()) {
                this.lexLogical();
            } else if (this.isCompare()) {
                this.lexCompare();
            } else if (this.isAssignment()) {
                this.lexAssignment();
            } else if (this.isEndOfStatement()) {
                this.lexEndOfStatement();
            } else {
                throw new Error(
                    `Unknown token ${this.currentChar} at line ${this.line} and column ${this.col}`
                );
            }
        }
        return this.tokens;
    }
}

export default Lexer;
