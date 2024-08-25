import { AppSettings } from "../types";
import ExpressionTypes from "../enums/ExpressionTypes";


/* This code snippet is defining an abstract class named `Settings` in TypeScript. Here is a breakdown
of what the class is doing: */
export default abstract class Settings {
  protected isValidExpression: boolean = false;
  protected expressionType = ExpressionTypes.Postfix;

  public constructor(protected settings?: Partial<AppSettings>) {
    this.defaultSettings();
  }

  protected abstract init(expression: string): void;
  protected abstract reset(): void;
  public abstract newSettings(settings: Partial<AppSettings>): void;

  protected defaultSettings(): void {
    const keys: string[] = Object.keys(
      this.settings === undefined ? {} : this.settings
    );
    for (const key of keys) {
      if (this.settings !== undefined && typeof this.settings === "object") {
        this.settings[key as keyof AppSettings] = Boolean(
          this.settings[key as keyof AppSettings]
        );
      }
    }
    // this.showSettings();
  }
  private showSettings(): void {
    console.log(this.settings);
  }
}
