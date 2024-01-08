class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.current = 0;
        this.currentToken = this.tokens[this.current];

        this.ast = {
            type: "Program",
            body: [],
        };
    }

    advance() {
        this.current++;
        this.currentToken = this.tokens[this.current];
    }

    parse() {
        while (!this.isEnd()) {
            let stmt = this.parseStatement();
            if (stmt) {
                this.ast.body.push(stmt);
            }
        }
        return this.ast;
    }

    parseStatement() {
        if (this.isAssignment()) {
            return this.parseAssignment();
        } else if (this.isFunction()) {
            return this.parseFunction();
        } else if (this.isReturn()) {
            return this.parseReturn();
        } else if (this.isFunctionCall()) {
            return this.parseFunctionCall();
        } else if (this.isIf()) {
            return this.parseIf();
        } else if (this.isElse()) {
            return this.parseElse();
        } else if (this.isWhile()) {
            return this.parseWhile();
        } else if (this.isPrint()) {
            return this.parsePrint();
        } else if (this.isEndOfStatement()) {
            this.advance();
        } else if (this.isPunctuation()) {
            this.advance();
        } else {
            throw new Error(
                `Unknown statement ${this.currentToken.value} [${this.currentToken.type}] at line ${this.currentToken.line} and column ${this.currentToken.col}`
            );
        }
    }

    parseAssignment() {
        let node = {
            type: "Assignment",
            name: this.currentToken.value,
            value: null,
            line: this.currentToken.line,
            col: this.currentToken.col,
        };
        this.advance();
        if (this.isAssignmentOperator()) {
            this.advance();
            node.value = this.parseExpression();
        } else {
            throw new Error(
                `Expected assignment operator at line ${this.currentToken.line} and column ${this.currentToken.col}`
            );
        }
        return node;
    }

    parseFunction() {
        let node = {
            type: "Function",
            name: null,
            parameters: [],
            body: [],
            line: this.currentToken.line,
            col: this.currentToken.col,
        };
        this.advance();
        if (this.isIdentifier()) {
            node.name = this.currentToken.value;
            this.advance();
            if (this.isLeftParen()) {
                this.advance();
                while (!this.isRightParen()) {
                    if (this.isIdentifier()) {
                        node.parameters.push(this.currentToken.value);
                        this.advance();
                        if (this.isComma()) {
                            this.advance();
                        }
                    } else {
                        throw new Error(
                            `Expected identifier at line ${this.currentToken.line} and column ${this.currentToken.col}`
                        );
                    }
                }
                this.advance();
                if (this.isLeftBrace()) {
                    this.advance();
                    while (!this.isRightBrace()) {
                        let stmt = this.parseStatement();
                        if (stmt) {
                            node.body.push(stmt);
                        }
                    }
                } else {
                    throw new Error(
                        `Expected left brace at line ${this.currentToken.line} and column ${this.currentToken.col}`
                    );
                }
            } else {
                throw new Error(
                    `Expected left parenthesis at line ${this.currentToken.line} and column ${this.currentToken.col}`
                );
            }
        } else {
            throw new Error(
                `Expected identifier at line ${this.currentToken.line} and column ${this.currentToken.col}`
            );
        }
        return node;
    }

    parseReturn() {
        let node = {
            type: "Return",
            value: null,
            line: this.currentToken.line,
            col: this.currentToken.col,
        };
        this.advance();
        node.value = this.parseExpression();
        if (this.isEndOfStatement()) {
            this.advance();
        } else {
            throw new Error(
                `Expected end of statement at line ${this.currentToken.line} and column ${this.currentToken.col}`
            );
        }
        return node;
    }

    parseFunctionCall() {
        if (this.isFunctionCall() === 1) {
            let node = {
                type: "FunctionCall",
                name: null,
                arguments: [],
                line: this.currentToken.line,
                col: this.currentToken.col,
            };
            node.name = this.currentToken.value;
            this.advance();
            if (this.isLeftParen()) {
                this.advance();
                while (!this.isRightParen()) {
                    let arg = this.parseExpression();
                    if (arg) {
                        node.arguments.push(arg);
                    }
                    if (this.isComma()) {
                        this.advance();
                    }
                }
                this.advance();
            } else {
                throw new Error(
                    `Expected left parenthesis at line ${this.currentToken.line} and column ${this.currentToken.col}`
                );
            }
            return node;
        } else if (this.isFunctionCall() === 2) {
            let prevToken = this.tokens[this.current - 1]; // add
            let node = {
                type: "FunctionCall",
                name: prevToken.value,
                arguments: [],
                line: this.currentToken.line,
                col: this.currentToken.col,
            };
            this.advance(); // (
            while (!this.isRightParen()) {
                let arg = this.parseExpression();
                if (arg) {
                    node.arguments.push(arg);
                }
                if (this.isComma()) {
                    this.advance();
                }
            }
            this.advance();
            return node;
        }
    }

    parseIf() {
        let node = {
            type: "If",
            condition: null,
            body: [],
            else: null,
            line: this.currentToken.line,
            col: this.currentToken.col,
        };
        this.advance();
        if (this.isLeftParen()) {
            this.advance();
            node.condition = this.parseExpression();
            if (this.isRightParen()) {
                this.advance();
                if (this.isLeftBrace()) {
                    this.advance();
                    while (!this.isRightBrace()) {
                        let stmt = this.parseStatement();
                        if (stmt) {
                            node.body.push(stmt);
                        }
                    }
                    if (this.isElse()) {
                        this.advance();
                        if (this.isLeftBrace()) {
                            this.advance();
                            while (!this.isRightBrace()) {
                                node.else = this.parseStatement();
                            }
                        } else {
                            throw new Error(
                                `Expected left brace at line ${this.currentToken.line} and column ${this.currentToken.col}`
                            );
                        }
                    }
                } else {
                    throw new Error(
                        `Expected left brace at line ${this.currentToken.line} and column ${this.currentToken.col}`
                    );
                }
            } else {
                throw new Error(
                    `Expected right parenthesis at line ${this.currentToken.line} and column ${this.currentToken.col}`
                );
            }
        } else {
            throw new Error(
                `Expected left parenthesis at line ${this.currentToken.line} and column ${this.currentToken.col}`
            );
        }
        return node;
    }

    parseElse() {
        if (this.isElse() === 1) {
            let node = {
                type: "Else",
                body: [],
                line: this.currentToken.line,
                col: this.currentToken.col,
            };
            this.advance();
            if (this.isLeftBrace()) {
                this.advance();
                while (!this.isRightBrace()) {
                    let stmt = this.parseStatement();
                    if (stmt) {
                        node.body.push(stmt);
                    }
                }
            } else {
                throw new Error(
                    `Expected left brace at line ${this.currentToken.line} and column ${this.currentToken.col}`
                );
            }
            return node;
        } else if (this.isElse() === 2) {
            let node = {
                type: "Else",
                body: [],
                line: this.currentToken.line,
                col: this.currentToken.col,
            };
            this.advance();
            if (this.isIf()) {
                this.advance();
                if (this.isLeftParen()) {
                    this.advance();
                    node.condition = this.parseExpression();
                    if (this.isRightParen()) {
                        this.advance();
                        if (this.isLeftBrace()) {
                            this.advance();
                            while (!this.isRightBrace()) {
                                let stmt = this.parseStatement();
                                if (stmt) {
                                    node.body.push(stmt);
                                }
                            }
                        } else {
                            throw new Error(
                                `Expected left brace at line ${this.currentToken.line} and column ${this.currentToken.col}`
                            );
                        }
                    } else {
                        throw new Error(
                            `Expected right parenthesis at line ${this.currentToken.line} and column ${this.currentToken.col}`
                        );
                    }
                } else {
                    throw new Error(
                        `Expected left parenthesis at line ${this.currentToken.line} and column ${this.currentToken.col}`
                    );
                }
            } else {
                throw new Error(
                    `Expected if at line ${this.currentToken.line} and column ${this.currentToken.col}`
                );
            }
            return node;
        }
    }

    parseWhile() {
        let node = {
            type: "While",
            condition: null,
            body: [],
            line: this.currentToken.line,
            col: this.currentToken.col,
        };
        this.advance();
        if (this.isLeftParen()) {
            this.advance();
            node.condition = this.parseExpression();
            if (this.isRightParen()) {
                this.advance();
                if (this.isLeftBrace()) {
                    this.advance();
                    while (!this.isRightBrace()) {
                        let stmt = this.parseStatement();
                        if (stmt) {
                            node.body.push(this.parseStatement());
                        }
                    }
                } else {
                    throw new Error(
                        `Expected left brace at line ${this.currentToken.line} and column ${this.currentToken.col}`
                    );
                }
            } else {
                throw new Error(
                    `Expected right parenthesis at line ${this.currentToken.line} and column ${this.currentToken.col}`
                );
            }
        } else {
            throw new Error(
                `Expected left parenthesis at line ${this.currentToken.line} and column ${this.currentToken.col}`
            );
        }
        return node;
    }

    parsePrint() {
        let node = {
            type: "Print",
            value: null,
            line: this.currentToken.line,
            col: this.currentToken.col,
        };
        this.advance();
        node.value = this.parseExpression();
        if (this.isEndOfStatement()) {
            this.advance();
        } else {
            throw new Error(
                `Expected end of statement at line ${this.currentToken.line} and column ${this.currentToken.col}`
            );
        }
        return node;
    }

    parseExpression() {
        if (this.isAssignment()) {
            return this.parseAssignment();
        } else {
            return this.parseLogical();
        }
    }

    parseLogical() {
        let node = this.parseEquality();
        while (this.isLogicalOperator()) {
            let operator = this.currentToken.value;
            this.advance();
            node = {
                type: "Binary",
                operator,
                left: node,
                right: this.parseEquality(),
                line: this.currentToken.line,
                col: this.currentToken.col,
            };
        }
        return node;
    }

    parseEquality() {
        let node = this.parseComparison();
        while (this.isEqualityOperator()) {
            let operator = this.currentToken.value;
            this.advance();
            node = {
                type: "Binary",
                operator,
                left: node,
                right: this.parseComparison(),
                line: this.currentToken.line,
                col: this.currentToken.col,
            };
        }
        return node;
    }

    parseComparison() {
        let node = this.parseAddition();
        while (this.isComparisonOperator()) {
            let operator = this.currentToken.value;
            this.advance();
            node = {
                type: "Binary",
                operator,
                left: node,
                right: this.parseAddition(),
                line: this.currentToken.line,
                col: this.currentToken.col,
            };
        }
        return node;
    }

    parseAddition() {
        let node = this.parseMultiplication();
        while (this.isAdditionOperator()) {
            let operator = this.currentToken.value;
            this.advance();
            node = {
                type: "Binary",
                operator,
                left: node,
                right: this.parseMultiplication(),
                line: this.currentToken.line,
                col: this.currentToken.col,
            };
        }
        return node;
    }

    parseMultiplication() {
        let node = this.parseUnary();
        while (this.isMultiplicationOperator()) {
            let operator = this.currentToken.value;
            this.advance();
            node = {
                type: "Binary",
                operator,
                left: node,
                right: this.parseUnary(),
                line: this.currentToken.line,
                col: this.currentToken.col,
            };
        }
        return node;
    }

    parseUnary() {
        if (this.isUnaryOperator()) {
            let operator = this.currentToken.value;
            this.advance();
            return {
                type: "Unary",
                operator,
                operand: this.parseUnary(),
            };
        } else {
            return this.parsePrimary();
        }
    }

    parsePrimary() {
        if (this.isNumber()) {
            let node = {
                type: "Number",
                value: this.currentToken.value,
                line: this.currentToken.line,
                col: this.currentToken.col,
            };
            this.advance();
            return node;
        } else if (this.isString()) {
            let node = {
                type: "String",
                value: this.currentToken.value,
                line: this.currentToken.line,
                col: this.currentToken.col,
            };
            this.advance();
            return node;
        } else if (this.isIdentifier()) {
            let node = {
                type: "Identifier",
                name: this.currentToken.value,
                line: this.currentToken.line,
                col: this.currentToken.col,
            };
            this.advance();
            return node;
        } else if (this.isLeftParen()) {
            this.advance();
            let node = this.parseExpression();
            if (this.isRightParen()) {
                this.advance();
                return node;
            } else {
                throw new Error(
                    `Expected right parenthesis at line ${this.currentToken.line} and column ${this.currentToken.col}`
                );
            }
        } else {
            throw new Error(
                `Expected number, string, identifier or left parenthesis at line ${this.currentToken.line} and column ${this.currentToken.col} but got ${this.currentToken.value} [${this.currentToken.type}]`
            );
        }
    }

    isEnd() {
        return this.current >= this.tokens.length;
    }

    isPunctuation() {
        return this.currentToken.type === "punctuation";
    }

    isAssignment() {
        return (
            this.currentToken.type === "identifier" &&
            this.tokens[this.current + 1].type === "assignment"
        );
    }

    isAssignmentOperator() {
        return this.currentToken.type === "assignment";
    }

    isFunction() {
        return (
            this.currentToken.type === "keyword" &&
            this.currentToken.value === "function"
        );
    }

    isReturn() {
        return (
            this.currentToken.type === "keyword" &&
            this.currentToken.value === "return"
        );
    }

    isFunctionCall() {
        let nextToken = this.tokens[this.current + 1];
        let prevToken = this.tokens[this.current - 1];
        if (
            this.currentToken.type === "identifier" &&
            nextToken.type === "punctuation" &&
            nextToken.value === "("
        ) {
            return 1;
        } else if (
            this.currentToken.type === "punctuation" &&
            this.currentToken.value === "(" &&
            prevToken.type === "identifier"
        ) {
            return 2;
        } else {
            return false;
        }
    }

    isIf() {
        return (
            this.currentToken.type === "keyword" &&
            this.currentToken.value === "if"
        );
    }

    isElse() {
        return (
            this.currentToken.type === "keyword" &&
            this.currentToken.value === "else"
        );
    }

    isWhile() {
        return (
            this.currentToken.type === "keyword" &&
            this.currentToken.value === "while"
        );
    }

    isPrint() {
        return (
            this.currentToken.type === "keyword" &&
            this.currentToken.value === "print"
        );
    }

    isLogicalOperator() {
        return this.currentToken.type === "logical";
    }

    isEqualityOperator() {
        return this.currentToken.type === "compare";
    }

    isComparisonOperator() {
        return this.currentToken.type === "compare";
    }

    isAdditionOperator() {
        return this.currentToken.type === "operation";
    }

    isMultiplicationOperator() {
        return this.currentToken.type === "operation";
    }

    isUnaryOperator() {
        return this.currentToken.type === "operation";
    }

    isNumber() {
        return this.currentToken.type === "number";
    }

    isString() {
        return this.currentToken.type === "string";
    }

    isIdentifier() {
        return this.currentToken.type === "identifier";
    }

    isLeftParen() {
        return (
            this.currentToken.type === "punctuation" &&
            this.currentToken.value === "("
        );
    }

    isRightParen() {
        return (
            this.currentToken.type === "punctuation" &&
            this.currentToken.value === ")"
        );
    }

    isLeftBrace() {
        return (
            this.currentToken.type === "punctuation" &&
            this.currentToken.value === "{"
        );
    }

    isRightBrace() {
        return (
            this.currentToken.type === "punctuation" &&
            this.currentToken.value === "}"
        );
    }

    isComma() {
        return (
            this.currentToken.type === "punctuation" &&
            this.currentToken.value === ","
        );
    }

    isEndOfStatement() {
        return this.currentToken.type === "endofstatement";
    }

    isElse() {
        let nextToken = this.tokens[this.current + 1];

        if (
            this.currentToken.type === "keyword" &&
            this.currentToken.value === "else" &&
            nextToken.type === "punctuation" &&
            nextToken.value === "{"
        ) {
            return 1;
        } else if (
            this.currentToken.type === "keyword" &&
            this.currentToken.value === "else" &&
            nextToken.type === "keyword" &&
            nextToken.value === "if"
        ) {
            return 2;
        } else {
            return false;
        }
    }
}

export default Parser;
