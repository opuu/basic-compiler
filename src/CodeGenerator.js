// Code Generation (Assembly 8086)
class CodeGenerator {
    constructor(code) {
        this.code = code;
        this.generatedCode = [];
    }

    generate() {
        this.code.forEach((statement) => {
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
        return this.generatedCode;
    }

    generateAssignment(statement) {
        this.generatedCode.push(`MOV AX, ${statement.value.value}`);
        this.generatedCode.push(`MOV ${statement.name}, AX`);
    }

    generateFunction(statement) {
        this.generatedCode.push(`${statement.name}:`);
        statement.body.forEach((statement) => {
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
    }

    generateFunctionCall(statement) {
        this.generatedCode.push(`CALL ${statement.name}`);
    }

    generateIf(statement) {
        if (statement.else) {
            this.generatedCode.push(`MOV AX, ${statement.condition.value}`);
            this.generatedCode.push(`CMP AX, 1`);
            this.generatedCode.push(`JE ${statement.body[0].name}`);
            this.generatedCode.push(`JMP ${statement.else.body[0].name}`);
            this.generatedCode.push(`${statement.body[0].name}:`);
            statement.body.forEach((statement) => {
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
            this.generatedCode.push(`${statement.else.body[0].name}:`);
            statement.else.body.forEach((statement) => {
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
        } else {
            this.generatedCode.push(`MOV AX, ${statement.condition.value}`);
            this.generatedCode.push(`CMP AX, 1`);
            this.generatedCode.push(`JE ${statement.body[0].name}`);
            this.generatedCode.push(`${statement.body[0].name}:`);
            statement.body.forEach((statement) => {
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
        }
    }

    generateElse(statement) {
        this.generatedCode.push(`${statement.body[0].name}:`);
        statement.body.forEach((statement) => {
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
    }

    generateWhile(statement) {
        this.generatedCode.push(`${statement.body[0].name}:`);
        statement.body.forEach((statement) => {
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
    }

    generatePrint(statement) {
        this.generatedCode.push(`MOV AH, 09H`);
        this.generatedCode.push(`MOV DX, ${statement.value.value}`);
        this.generatedCode.push(`INT 21H`);
    }

    generateReturn(statement) {
        this.generatedCode.push(`MOV AX, ${statement.value.value}`);
        this.generatedCode.push(`RET`);
    }
}

export default CodeGenerator;
