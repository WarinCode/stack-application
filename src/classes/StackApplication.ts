import { StackOperations, AppSettings } from "../types";
import Statement from "./Statement";
import Settings from "./Settings";


/* This TypeScript class is responsible for handling the conversion of infix expressions to postfix
expressions. Here is a breakdown of what the class is doing: */
export default class
  extends Settings
  implements StackOperations
{
  public top: number = -1;
  private operatorStack: string[] = [];
  private output: string = "";
  private statement: Statement = new Statement();

  public constructor(
    private expression: string,
    settings?: Partial<AppSettings>
  ) {
    super(settings);
    this.init(expression);
  }

  public override init(expression: string): void {
    this.expression = expression.trim();
    this.isValidExpression = Boolean(this.expression);
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
    if (this.settings?.enableIndentation) {
      this.output = this.output.split("").filter((char: string) => char !== " ").join(" ");
    }
    if (this.settings?.enableCapitalize) {
      this.output = this.output.toUpperCase();
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

  public override newSettings(settings: Partial<AppSettings>): void {
    this.settings = settings;
    this.defaultSettings();
    this.reset();
  }

  protected override reset(): void {
    this.output = "";
    this.top = -1;
    this.operatorStack = [];
    this.statement = new Statement();
    this.init(this.expression);
  }

  private getTop(): string {
    this.top = this.operatorStack.length - 1;
    return this.operatorStack[this.top];
  }

  private getOperators(): string {
    if(this.settings?.enableSeparator && this.settings?.enableIndentation){
      return this.operatorStack.join(", ");
    } else if(this.settings?.enableSeparator){
      return this.operatorStack.join(",");
    } else if (this.settings?.enableIndentation) {
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
          if (this.isEmpty()) {
            this.push(input);
          } else if (this.getTop() === input) {
            const operator: string = this.pop() as string;
            this.push(input);
            this.setOutput(operator);
          } else {
            this.push(input);
          }
          break;
        case "*":
        case "/":
          if (!this.checkTop(["*", "/"]) || this.isEmpty()) {
            this.push(input);
          } else {
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
          break;
        case "-":
        case "+":
          if (!this.checkTop(["-", "+", "*", "/", "^"]) || this.isEmpty()) {
            this.push(input);
          } else {
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
