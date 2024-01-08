// Semantic Analysis
class SemanticAnalyzer {
    constructor(ast) {
        this.ast = ast;
        this.variables = {};
        this.functions = {};
        this.currentScope = "global";
        this.errors = [];
    }

    analyze() {
        this.ast.body.forEach((statement) => {
            if (statement.type === "Assignment") {
                this.analyzeAssignment(statement);
            } else if (statement.type === "Function") {
                this.analyzeFunction(statement);
            } else if (statement.type === "FunctionCall") {
                this.analyzeFunctionCall(statement);
            } else if (statement.type === "If") {
                this.analyzeIf(statement);
            } else if (statement.type === "While") {
                this.analyzeWhile(statement);
            } else if (statement.type === "Print") {
                this.analyzePrint(statement);
            } else if (statement.type === "Return") {
                this.analyzeReturn(statement);
            } else if (statement.type === "Else") {
                this.analyzeElse(statement);
            }
        });
        return this.errors;
    }

    analyzeAssignment(statement) {
        let name = statement.name;
        let value = statement.value;
        if (
            this.variables[name] &&
            this.variables[name].scope === this.currentScope
        ) {
            this.errors.push(
                `Variable ${name} already declared at line ${this.variables[name].line} and column ${this.variables[name].col}, cannot redeclare at line ${statement.line} and column ${statement.col}`
            );
        } else {
            this.variables[name] = {
                type: value.type,
                scope: this.currentScope,
                line: statement.line,
                col: statement.col,
            };
        }
    }

    analyzeFunction(statement) {
        let name = statement.name;
        let parameters = statement.parameters;
        let body = statement.body;
        if (this.functions[name]) {
            this.errors.push(
                `Function ${name} already declared at line ${this.functions[name].line} and column ${this.functions[name].col}`
            );
        } else {
            this.functions[name] = {
                parameters,
                body,
                line: statement.line,
                col: statement.col,
            };
        }
    }

    analyzeFunctionCall(statement) {
        let name = statement.name;
        let args = statement.arguments;
        if (!this.functions[name]) {
            this.errors.push(
                `Function ${name} not declared at line ${statement.line} and column ${statement.col}`
            );
        } else {
            if (args.length !== this.functions[name].parameters.length) {
                this.errors.push(
                    `Function ${name} expects ${this.functions[name].parameters.length} arguments but ${args.length} were provided at line ${statement.line} and column ${statement.col}`
                );
            }
        }

        args.forEach((arg) => {
            this.analyzeExpression(arg);
        });

        this.functions[name].parameters.forEach((param) => {
            if (!this.variables[param]) {
                this.errors.push(
                    `Parameter ${param} not declared at line ${statement.line} and column ${statement.col}`
                );
            }
        });

        return this.functions[name].type;
    }

    analyzeIf(statement) {
        this.analyzeExpression(statement.condition);
        this.currentScope = "if";
        statement.body.forEach((statement) => {
            if (statement.type === "Assignment") {
                this.analyzeAssignment(statement);
            } else if (statement.type === "Function") {
                this.analyzeFunction(statement);
            } else if (statement.type === "FunctionCall") {
                this.analyzeFunctionCall(statement);
            } else if (statement.type === "If") {
                this.analyzeIf(statement);
            } else if (statement.type === "While") {
                this.analyzeWhile(statement);
            } else if (statement.type === "Print") {
                this.analyzePrint(statement);
            } else if (statement.type === "Return") {
                this.analyzeReturn(statement);
            } else if (statement.type === "Else") {
                this.analyzeElse(statement);
            }
        });
        this.currentScope = "global";
    }

    analyzeElse(statement) {
        this.currentScope = "else";
        statement.body.forEach((statement) => {
            if (statement.type === "Assignment") {
                this.analyzeAssignment(statement);
            } else if (statement.type === "Function") {
                this.analyzeFunction(statement);
            } else if (statement.type === "FunctionCall") {
                this.analyzeFunctionCall(statement);
            } else if (statement.type === "If") {
                this.analyzeIf(statement);
            } else if (statement.type === "While") {
                this.analyzeWhile(statement);
            } else if (statement.type === "Print") {
                this.analyzePrint(statement);
            } else if (statement.type === "Return") {
                this.analyzeReturn(statement);
            } else if (statement.type === "Else") {
                this.analyzeElse(statement);
            }
        });
        this.currentScope = "global";
    }

    analyzeWhile(statement) {
        this.analyzeExpression(statement.condition);
        this.currentScope = "while";
        statement.body.forEach((statement) => {
            if (statement.type === "Assignment") {
                this.analyzeAssignment(statement);
            } else if (statement.type === "Function") {
                this.analyzeFunction(statement);
            } else if (statement.type === "FunctionCall") {
                this.analyzeFunctionCall(statement);
            } else if (statement.type === "If") {
                this.analyzeIf(statement);
            } else if (statement.type === "While") {
                this.analyzeWhile(statement);
            } else if (statement.type === "Print") {
                this.analyzePrint(statement);
            } else if (statement.type === "Return") {
                this.analyzeReturn(statement);
            } else if (statement.type === "Else") {
                this.analyzeElse(statement);
            }
        });
        this.currentScope = "global";
    }

    analyzePrint(statement) {
        this.analyzeExpression(statement.value);
    }

    analyzeReturn(statement) {
        this.analyzeExpression(statement.value);
    }

    analyzeExpression(expression) {
        if (expression.type === "Binary") {
            this.analyzeExpression(expression.left);
            this.analyzeExpression(expression.right);
        } else if (expression.type === "Unary") {
            this.analyzeExpression(expression.operand);
        } else if (expression.type === "Identifier") {
            if (!this.variables[expression.name]) {
                this.errors.push(
                    `Variable ${expression.name} not declared at line ${expression.line} and column ${expression.col}`
                );
            }
        }
    }
}

export default SemanticAnalyzer;
