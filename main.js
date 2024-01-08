import Lexer from "./src/Lexer.js";
import Parser from "./src/Parser.js";
import SemanticAnalyzer from "./src/SemanticAnalyzer.js";
import IntermediateCodeGenerator from "./src/IntermediateCodeGenerator.js";
import CodeOptimizer from "./src/CodeOptimizer.js";
import CodeGenerator from "./src/CodeGenerator.js";
import fs from "fs";

// safely handles circular references in JSON.stringify
JSON.safeStringify = (obj, indent = 2) => {
  let cache = [];
  const retVal = JSON.stringify(
    obj,
    (key, value) =>
      typeof value === "object" && value !== null
        ? cache.includes(value)
          ? undefined // Duplicate reference found, discard key
          : cache.push(value) && value // Store value in our collection
        : value,
    indent
  );
  cache = null;
  return retVal;
};

let code = "";

// load code from file
try {
  code = fs.readFileSync(process.argv[2], "utf8");
} catch (err) {
  console.log(`Unable to load file ${process.argv[2]}`);
  process.exit(1);
} finally {
  console.log(`Start: loaded file ${process.argv[2]}`);
}

// Lexical Analysis
console.log("Step 1: Lexical Analysis");
let lexer = new Lexer(code);
let tokens = lexer.lex();
console.log("Step 1: Lexical Analysis Complete");

// save tokens to file (in dist folder)
fs.writeFileSync("./dist/tokens.json", JSON.safeStringify(tokens, 2), "utf8");

// Parsing Abstract Syntax Tree
console.log("Step 2: Parsing Abstract Syntax Tree");
let parser = new Parser(tokens);
let ast = parser.parse();
console.log("Step 2: Parsing Abstract Syntax Tree Complete");

// save ast to file (in dist folder)
fs.writeFileSync("./dist/ast.json", JSON.safeStringify(ast, 2), "utf8");

// Semantic Analysis
console.log("Step 3: Semantic Analysis");
let semanticAnalyzer = new SemanticAnalyzer(ast);
let warnings = semanticAnalyzer.analyze();
console.log("Step 3: Semantic Analysis Complete");

warnings.forEach((warning) => {
  console.log("Warning: ", warning);
});

// save errors to file (in dist folder)
fs.writeFileSync(
  "./dist/warnings.json",
  JSON.safeStringify(warnings, 2),
  "utf8"
);

// Intermediate Code Generation
console.log("Step 4: Intermediate Code Generation");
let intermediateCodeGenerator = new IntermediateCodeGenerator(ast);
let intermediatecode = intermediateCodeGenerator.generate();
console.log("Step 4: Intermediate Code Generation Complete");

fs.writeFileSync(
  "./dist/intermediatecode.json",
  JSON.safeStringify(intermediatecode, 2),
  "utf8"
);

// Code Optimization
console.log("Step 5: Code Optimization");
let codeOptimizer = new CodeOptimizer(intermediatecode);
let optimizedCode = codeOptimizer.optimize();
console.log("Step 5: Code Optimization Complete");

fs.writeFileSync(
  "./dist/optimizedCode.json",
  JSON.safeStringify(optimizedCode, 2),
  "utf8"
);

// Code Generation
console.log("Step 6: Code Generation");
let codeGenerator = new CodeGenerator(optimizedCode);
let generatedCode = codeGenerator.generate();
console.log("Step 6: Code Generation Complete");

// save generatedCode to file (in dist folder) join each line with a newline
fs.writeFileSync("./dist/output.asm", generatedCode.join("\n"), "utf8");

console.log("End: output.asm generated in dist folder!");
