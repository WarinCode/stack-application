import StackApplication from "./classes/StackApplication";

// const expressions: string[] = [
//   "D - B + C",
//   "(A + B) * C -D * F + C",
//   "A * B - (C + D ) + E",
//   "K + L - M * N + (O ^ P) * W / U / V * T + Q",
//   "((A + B) * C  - (D - E)) ^ (F + G)",
//   "A * B + C",
//   "(A * B) + (C / D)",
//   "((A + B) - C * (D / E)) + F",
//   "A + B",
//   "A + (B * C)",
//   "(A + B) / (C * D)",
//   "A + B * C",
//   "(A + B) * C",
//   "A + B * (C - D / E) / F",
// ];

// expressions.forEach((expression: string): void => {
//   const stackApp: StackApplication = new StackApplication(expression);
//   stackApp.conversion();
//   console.log(`From Infix expression: ${stackApp.toInfix()}`);
//   console.log(`to Postfix expression: ${stackApp.toPostfix()}`);
//   stackApp.display();
//   console.log();
// });

const expression: string = "K + L - M * N + (O ^ P) * W / U / V * T + Q";
const stackApp: StackApplication = new StackApplication(expression);
stackApp.conversion();
console.log(`From Infix expression: ${stackApp.toInfix()}`);
console.log(`to Postfix expression: ${stackApp.toPostfix()}`);
stackApp.display();
console.log();