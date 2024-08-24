import StackApplication from "./classes/StackApplication";

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

expressions.forEach((expression: string, index: number): void => {
  const stackApp: StackApplication = new StackApplication(expression);
  stackApp.conversion();
  console.log(`Example ${index + 1}`);
  console.log(`Infix expression: ${stackApp.toInfix()}`);
  console.log(`Postfix expression: ${stackApp.toPostfix()}`);
  stackApp.display();
  console.log();
});