# Basic Compiler

## Steps
- **Step 1:** Lexical Analysis
- **Step 2:** Syntax Analysis
- **Step 3:** Semantic Analysis
- **Step 4:** Intermediate Code Generation
- **Step 5:** Code Optimization
- **Step 6:** Code Generation (Assembly)


## Grammar

```
program -> statement*
statement -> assignment | function | if | while | print
assignment -> identifier "=" expression ";"
function -> "function" identifier "(" parameters ")" "{" statement* "}"
parameters -> identifier ("," identifier)*
if -> "if" "(" expression ")" "{" statement* "}" ("else" "{" statement* "}")?
while -> "while" "(" expression ")" "{" statement* "}"
print -> "print" expression ";"
expression -> assignment | logical
assignment -> identifier "=" expression
logical -> equality (("&&" | "||") equality)*
equality -> comparison (("==" | "!=") comparison)*
comparison -> addition ((">" | ">=" | "<" | "<=") addition)*
addition -> multiplication (("+" | "-") multiplication)*
multiplication -> unary (("*" | "/") unary)*
unary -> ("+" | "-") unary | primary
primary -> number | string | identifier | "(" expression ")"
```

## Example Syntax

```
// Simple program demonstrating basic language features

// Type-less variables
x = 5;
y = "Hello";

// boolean
bool = true;

// Loop (while)
count = 0;
while (count < 5) {
    print(y);
    count = count + 1;
}

// If-else ladder
score = 75;
grade = "F";
if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else if (score >= 70) {
    grade = "C";
} else {
    grade = "D";
}
print("Grade:" + grade);

// Arithmetic operations
a = 10;
b = 3;
result = a + b * 2;
print("Arithmetic result:" + result);

// String concatenation
greeting = "Hi";
name = "Opu";
message = greeting + " " + name;
print(message);

/*
Multi-line comment
This is a demonstration
of the basic language syntax.
*/

// Functions
function add(a, b){
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

c = add(a, b);

// End of program
```
