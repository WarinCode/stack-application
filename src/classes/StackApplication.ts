import { StackOperations, AppSettings, ToPostfix, ToPrefix } from "../types";
import Statement from "./Statement";
import Settings from "./Settings";
import ExpressionTypes from "../enums/ExpressionTypes";

/* The above code is a TypeScript class that implements stack operations for converting mathematical
expressions between infix, postfix, and prefix notations. It includes methods for pushing and
popping operators onto a stack, converting expressions to postfix, prefix, and infix notations, and
displaying the conversion process. The class also handles settings such as enabling indentation and
capitalization for the output. The main functionality lies in the `conversion` method, where it
processes the input expression and converts it to the desired notation based on the expression type
set. The `display` method outputs the conversion process in a tabular format based on the expression */
export default class extends Settings implements StackOperations {
  public top: number = -1;
  private operatorStack: string[] = [];
  private output: string = "";
  private statement: Statement = new Statement();

  public constructor(
    private expression: string,
    settings?: Partial<AppSettings>
  ) {
    super(settings);
    this.init(this.expression);
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
      this.output = this.output
        .split("")
        .filter((char: string) => char !== " ")
        .join(" ");
    }
    if (this.settings?.enableCapitalize) {
      this.output = this.output.toUpperCase();
    }
    if(this.expressionType === ExpressionTypes.Prefix){
      return this.output.split("").reverse().join("");
    }
    return this.output;
  }

  private setOutput(
    input: string
  ): void {
    if (input !== "(" && input !== ")" && input !== undefined && input !== "") {
      this.output += input;
    }
  }

  public setExpressionType(type: ExpressionTypes = ExpressionTypes.Postfix): void {
    this.expressionType = type;
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
    if (this.settings?.enableSeparator && this.settings?.enableIndentation) {
      return this.operatorStack.join(", ");
    } else if (this.settings?.enableSeparator) {
      return this.operatorStack.join(",");
    } else if (this.settings?.enableIndentation) {
      return this.operatorStack.join(" ");
    }
    return this.operatorStack.join("");
  }

  public toPostfix(): string | null {
    return this.isValidExpression ? this.getOutput() : null;
  }

  public toPrefix(): string | null {
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
    if(this.expressionType === ExpressionTypes.Infix) return;

    let temp: string = this.expression;
    if (this.expressionType === ExpressionTypes.Prefix) {
      temp = temp
        .split("")
        .reverse()
        .map((char: string): string => {
          if (char === "(") return ")";
          else if (char === ")") return "(";
          else return char;
        })
        .join("");
    }

    for (let i: number = 0; i < this.expression.length; i++) {
      const input: string = temp[i];
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
    if (this.expressionType === ExpressionTypes.Postfix) {
      console.table(this.statement.getStatements());
    } else if (this.expressionType === ExpressionTypes.Prefix) {
      console.table(
        this.statement
          .getStatements()
          .map(({ infix, operatorStack, postfix }: ToPostfix): ToPrefix => {
            return { infix, operatorStack, prefix: postfix };
          })
      );
    }
  }
}
