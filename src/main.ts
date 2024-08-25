import StackApplication from "./classes/StackApplication";

/* The `expressions` constant is an array of mathematical expressions in infix notation. Each string in
the array represents a mathematical expression using variables and operators. These expressions will
be processed and converted to postfix notation using a `StackApplication` class in the TypeScript
code snippet provided. */
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

/* The code snippet you provided is iterating over each mathematical expression in the `expressions`
array using the `forEach` method. For each expression, it creates a new instance of the
`StackApplication` class, passing the expression and an object with configuration options
(`enableIndentation` and `enableCapitalize`). */
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
  console.log();
});