import { AppSettings } from "../types";

/* This TypeScript code defines an abstract class named `Settings` that serves as a base class for
other classes to inherit from. Here is a breakdown of what the code is doing: */
export default abstract class Settings {
  protected isValidExpression: boolean = false;

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
