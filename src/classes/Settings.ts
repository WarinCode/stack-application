export default abstract class Settings {
    protected isValidExpression: boolean = false;
    protected isUppercase: boolean = false;
    protected canIndent: boolean = false;

    public constructor(isUppercase: boolean, canIndent: boolean){
        this.isUppercase = isUppercase;
        this.canIndent = canIndent;
    }

    protected abstract init(expression: string): void;
}