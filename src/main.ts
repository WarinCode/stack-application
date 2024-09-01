import StackApplication from "./classes/StackApplication";
import ExpressionTypes from "./enums/ExpressionTypes";

/* The `expressions` constant is an array of strings that contains various infix mathematical
expressions. These expressions represent mathematical operations using operands (like A, B, C) and
operators (like +, -, *, /). The purpose of this array is to demonstrate the conversion of infix
expressions to postfix and prefix expressions using a Stack data structure. */
const expressions: string[] = [
  "A + B",
  "A * B + C",
  "D - B + C",
  "A + B * C",
  "A + (B * C)",
  "(A + B) * C",
  "(A + B) / (C * D)",
  "(A * B) + (C / D)",
  "(A + B) * C -D * F + C",
  "A * B - (C + D ) + E",
  "((A + B) * C  - (D - E)) ^ (F + G)",
  "((A + B) - C * (D / E)) + F",
  "A + B * (C - D / E) / F",
  "K + L - M * N + (O ^ P) * W / U / V * T + Q",
];

/* This code snippet is converting infix mathematical expressions to postfix expressions using a Stack
data structure. Here's a breakdown of what it does: */
console.log("Convert from Infix expression to Postfix expression.");
expressions.forEach((expression: string, index: number): void => {
  const stackApp: StackApplication = new StackApplication(expression, {
    enableIndentation: true,
    enableCapitalize: true,
  });
  stackApp.conversion();
  console.log(`Example ${index + 1}`);
  console.log(`Infix expression: ${stackApp.toInfix()}`);
  console.log(`Postfix expression: ${stackApp.toPostfix()}`);
  stackApp.display();
});

/* This code snippet is converting infix mathematical expressions to prefix expressions using a Stack
data structure. Here's a breakdown of what it does: */
console.log("Convert from Infix expression to Prefix expression.");
expressions.forEach((expression: string, index: number): void => {
  const stackApp: StackApplication = new StackApplication(expression, {
    enableIndentation: true,
    enableCapitalize: true,
  });
  stackApp.setExpressionType(ExpressionTypes.Prefix);
  stackApp.conversion();
  console.log(`Example ${index + 1}`);
  console.log(`Infix expression: ${stackApp.toInfix()}`);
  console.log(`Prefix expression: ${stackApp.toPostfix()}`);
  stackApp.display();
});