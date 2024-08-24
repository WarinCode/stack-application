import Statement from "../classes/Statement";

export interface StackOperations {
  init(expression: string): void;
  push(value: string): void;
  pop(): string | undefined;
  conversion(): void;
  toInfix(): string | null;
  toPostfix(): string | null;
}

export type ShowExpression = Pick<
  Statement,
  "infix" | "operatorStack" | "postfix"
>;
