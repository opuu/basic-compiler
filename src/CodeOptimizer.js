// Code Optimization
class CodeOptimizer {
    constructor(code) {
        this.code = code;
        this.optimizedCode = [];
    }

    optimize() {
        this.code.forEach((statement) => {
            if (statement.type === "Assignment") {
                this.optimizeAssignment(statement);
            } else if (statement.type === "Function") {
                this.optimizeFunction(statement);
            } else if (statement.type === "FunctionCall") {
                this.optimizeFunctionCall(statement);
            } else if (statement.type === "If") {
                this.optimizeIf(statement);
            } else if (statement.type === "While") {
                this.optimizeWhile(statement);
            } else if (statement.type === "Print") {
                this.optimizePrint(statement);
            } else if (statement.type === "Return") {
                this.optimizeReturn(statement);
            } else if (statement.type === "Else") {
                this.optimizeElse(statement);
            }
        });
        return this.optimizedCode;
    }

    optimizeAssignment(statement) {
        this.optimizedCode.push(statement);
    }

    optimizeFunction(statement) {
        this.optimizedCode.push(statement);
    }

    optimizeFunctionCall(statement) {
        this.optimizedCode.push(statement);
    }

    optimizeIf(statement) {
        this.optimizedCode.push(statement);
    }

    optimizeElse(statement) {
        this.optimizedCode.push(statement);
    }

    optimizeWhile(statement) {
        this.optimizedCode.push(statement);
    }

    optimizePrint(statement) {
        this.optimizedCode.push(statement);
    }

    optimizeReturn(statement) {
        this.optimizedCode.push(statement);
    }
}

export default CodeOptimizer;
