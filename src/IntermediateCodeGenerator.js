// Intermediate Code Generation
class IntermediateCodeGenerator {
    constructor(ast) {
        this.ast = ast;
        this.code = [];
        this.currentScope = "global";
        this.currentFunction = null;
        this.currentFunctionCall = null;
        this.currentIf = null;
        this.currentWhile = null;
        this.currentElse = null;
        this.currentReturn = null;
        this.currentPrint = null;
        this.currentAssignment = null;
        this.currentExpression = null;
        this.currentBinary = null;
        this.currentUnary = null;
        this.currentIdentifier = null;
        this.currentNumber = null;
        this.currentString = null;
    }

    generate() {
        this.ast.body.forEach((statement) => {
            if (statement.type === "Assignment") {
                this.generateAssignment(statement);
            } else if (statement.type === "Function") {
                this.generateFunction(statement);
            } else if (statement.type === "FunctionCall") {
                this.generateFunctionCall(statement);
            } else if (statement.type === "If") {
                this.generateIf(statement);
            } else if (statement.type === "While") {
                this.generateWhile(statement);
            } else if (statement.type === "Print") {
                this.generatePrint(statement);
            } else if (statement.type === "Return") {
                this.generateReturn(statement);
            } else if (statement.type === "Else") {
                this.generateElse(statement);
            }
        });
        return this.code;
    }

    generateAssignment(statement) {
        this.currentAssignment = statement;
        this.currentExpression = statement.value;
        this.generateExpression();
        this.code.push({
            type: "Assignment",
            name: statement.name,
            value: this.currentExpression,
            line: statement.line,
            col: statement.col,
        });
    }

    generateFunction(statement) {
        this.currentFunction = statement;
        this.currentScope = "function";
        this.code.push({
            type: "Function",
            name: statement.name,
            parameters: statement.parameters,
            body: statement.body,
            line: statement.line,
            col: statement.col,
        });
        this.currentScope = "global";
    }

    generateFunctionCall(statement) {
        this.currentFunctionCall = statement;
        this.code.push({
            type: "FunctionCall",
            name: statement.name,
            arguments: statement.arguments,
            line: statement.line,
            col: statement.col,
        });
    }

    generateIf(statement) {
        this.currentIf = statement;
        this.currentScope = "if";
        this.code.push({
            type: "If",
            condition: statement.condition,
            body: statement.body,
            line: statement.line,
            col: statement.col,
        });
        this.currentScope = "global";
    }

    generateElse(statement) {
        this.currentElse = statement;
        this.currentScope = "else";
        this.code.push({
            type: "Else",
            body: statement.body,
            line: statement.line,
            col: statement.col,
        });
        this.currentScope = "global";
    }

    generateWhile(statement) {
        this.currentWhile = statement;
        this.currentScope = "while";
        this.code.push({
            type: "While",
            condition: statement.condition,
            body: statement.body,
            line: statement.line,
            col: statement.col,
        });
        this.currentScope = "global";
    }

    generatePrint(statement) {
        this.currentPrint = statement;
        this.currentExpression = statement.value;
        this.generateExpression();
        this.code.push({
            type: "Print",
            value: this.currentExpression,
            line: statement.line,
            col: statement.col,
        });
    }

    generateReturn(statement) {
        this.currentReturn = statement;
        this.currentExpression = statement.value;
        this.generateExpression();
        this.code.push({
            type: "Return",
            value: this.currentExpression,
            line: statement.line,
            col: statement.col,
        });
    }

    generateExpression() {
        if (this.currentExpression.type === "Binary") {
            this.generateBinary();
        } else if (this.currentExpression.type === "Unary") {
            this.generateUnary();
        } else if (this.currentExpression.type === "Identifier") {
            this.generateIdentifier();
        } else if (this.currentExpression.type === "Number") {
            this.generateNumber();
        } else if (this.currentExpression.type === "String") {
            this.generateString();
        }
    }

    generateBinary() {
        this.currentBinary = this.currentExpression;
        this.currentExpression = this.currentBinary.left;
        this.generateExpression();
        this.currentBinary.left = this.currentExpression;
        this.currentExpression = this.currentBinary.right;
        this.generateExpression();
        this.currentBinary.right = this.currentExpression;
        this.currentExpression = this.currentBinary;
    }

    generateUnary() {
        this.currentUnary = this.currentExpression;
        this.currentExpression = this.currentUnary.operand;
        this.generateExpression();
        this.currentUnary.operand = this.currentExpression;
        this.currentExpression = this.currentUnary;
    }

    generateIdentifier() {
        this.currentIdentifier = this.currentExpression;
        this.currentExpression = this.currentIdentifier;
    }

    generateNumber() {
        this.currentNumber = this.currentExpression;
        this.currentExpression = this.currentNumber;
    }

    generateString() {
        this.currentString = this.currentExpression;
        this.currentExpression = this.currentString;
    }
}

export default IntermediateCodeGenerator;
