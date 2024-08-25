import { ToPostfix } from "../types";

/* The class Statement in TypeScript represents a mathematical statement with infix, operator stack,
and postfix expressions. */
export default class Statement {
  public infix: string | null = "";
  public operatorStack: string | null = "";
  public postfix: string | null = "";
  public statements: Statement[] = [];

  public createStatement(
    infix: string | null,
    operator: string | null,
    postfix: string | null
  ): void {
    if (infix !== " ") {
      const statement: Statement = new Statement();
      statement.infix = infix?.length === 0 ? null : infix;
      statement.operatorStack = operator?.length === 0 ? null : operator;
      statement.postfix = postfix?.length === 0 ? null : postfix;
      this.statements.push(statement);
    }
  }

  public getStatements(): ToPostfix[] {
    return this.statements.map(
      ({ infix, operatorStack, postfix }: Statement): ToPostfix => {
        return { infix, operatorStack, postfix };
      }
    );
  }
}
