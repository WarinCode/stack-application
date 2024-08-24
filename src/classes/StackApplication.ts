import { StackOperations } from "../types";
import Statement from "./Statement";
import Settings from "./Settings";

export default class StackApplication
  extends Settings
  implements StackOperations
{
  public top: number = -1;
  private operatorStack: string[] = [];
  private output: string = "";
  private statement: Statement = new Statement();

  public constructor(
    private expression: string,
    isUppercase: boolean = false,
    canIndent: boolean = false
  ) {
    super(isUppercase, canIndent);
    this.init(expression);
  }

  public init(expression: string): void {
    this.expression = expression.trim();
    this.isValidExpression = Boolean(this.expression.length);
  }

  public getExpression(): string {
    return this.expression;
  }

  public setExpression(expression: string): void {
    this.init(expression);
  }

  public push(value: string): void {
    this.top++;
    this.operatorStack.push(value);
  }

  public pop(): string | undefined {
    if (!this.isEmpty()) {
      this.top--;
      return this.operatorStack.pop();
    }
    return undefined;
  }

  public getOutput(): string {
    if(this.canIndent){
      return this.output.split("").join(" ");
    }
    if(this.isUppercase){
      return this.output.toUpperCase();
    }
    return this.output;
  }

  private setOutput(input: string): void {
    if (input !== "(" && input !== ")" && input !== undefined) {
      this.output += input;
    }
  }

  private isEmpty(): boolean {
    return this.operatorStack.length === 0;
  }

  private getTop(): string {
    this.top = this.operatorStack.length - 1;
    return this.operatorStack[this.top];
  }

  private getOperators(): string{
    if(this.canIndent){
      return this.operatorStack.join(" ");
    }
    return this.operatorStack.join("");
  }

  public toPostfix(): string | null {
    return this.isValidExpression ? this.getOutput() : null;
  }

  public toInfix(): string | null {
    return this.isValidExpression ? this.getExpression() : null;
  }

  private checkTop(operators: string[]): boolean {
    return operators.includes(this.getTop());
  }

  public conversion(): void {
    if (!this.isValidExpression) return;

    for (let i: number = 0; i < this.expression.length; i++) {
      const input: string = this.expression[i];
      switch (input) {
        case " ":
          break;
        case "(":
          this.push(input);
          break;
        case ")":
          this.push(")");
          for (
            let j = this.operatorStack.lastIndexOf("("),
              k = this.operatorStack.lastIndexOf(")");
            j <= k;
            j++
          ) {
            const operator: string = this.pop() as string;
            if (operator !== "(" && operator !== ")") {
              this.setOutput(operator);
            }
          }
          break;
        case "^":
          if (this.getTop() === input) {
            const operator: string = this.pop() as string;
            this.push(input);
            this.setOutput(operator);
          } else {
            this.push(input);
          }
          break;
        case "*":
        case "/":
          // !["*", "/"].includes(this.getTop())
          if (!this.checkTop(["*", "/"])) {
            this.push(input);
          } else {
            // ["*", "/"].includes(this.getTop())
            while (this.checkTop(["*", "/"])) {
              if (!this.isEmpty()) {
                const operator: string = this.pop() as string;
                this.setOutput(operator);
              } else {
                break;
              }
            }
            this.push(input);
          }
          // if (["*", "/"].includes(this.getTop())) {
          //   const operator: string = this.pop() as string;
          //   this.push(input);
          //   this.setOutput(operator);
          // } else {
          //   this.push(input);
          // }
          break;
        case "-":
        case "+":
          // !["-", "+", "*", "/", "^"].includes(this.getTop())
          if (!this.checkTop(["-", "+", "*", "/", "^"])) {
            this.push(input);
          } else {
            // ["-", "+", "*", "/", "^"].includes(this.getTop())
            while (this.checkTop(["-", "+", "*", "/", "^"])) {
              if (!this.isEmpty()) {
                const operator: string = this.pop() as string;
                this.setOutput(operator);
              } else {
                break;
              }
            }
            this.push(input);
          }
          // if (["-", "+", "*", "/", "^"].includes(this.getTop())) {
          //   const operator: string = this.pop() as string;
          //   this.push(input);
          //   this.setOutput(operator);
          // } else {
          //   this.push(input);
          // }
          break;
        default:
          this.setOutput(input);
      }

      this.statement.createStatement(
        input,
        this.getOperators(),
        this.getOutput()
      );
    }

    if (!this.isEmpty()) {
      for (let k: number = this.operatorStack.length - 1; k >= 0; k--) {
        const operator: string = this.pop() as string;
        this.setOutput(operator);
        this.statement.createStatement(
          null,
          this.getOperators(),
          this.getOutput()
        );
      }
    }
  }

  public display(): void {
    console.table(this.statement.getStatements());
  }
}
