import Statement from "../classes/Statement";

/* The `export interface StackOperations` is defining a TypeScript interface named `StackOperations`.
This interface specifies a set of methods that can be implemented by classes or objects that adhere
to this interface. Here's a breakdown of the methods defined in the interface: */
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


/* The `export interface AppSettings` is defining a TypeScript interface named `AppSettings`. This
interface specifies a set of properties that can be used to configure certain settings for an
application. Each property in the interface represents a specific setting that can be enabled or
disabled by assigning a boolean value (`true` or `false`). */
export interface AppSettings {
  enableIndentation?: boolean
  enableSeparator?: boolean;
  enableCapitalize?: boolean;
}
