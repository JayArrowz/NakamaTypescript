export class MyClass {
    private readonly aInteger: number;
    constructor(aInteger: number) {
        this.aInteger = aInteger;
    }

    public getInteger(): number {
        return this.aInteger;
    }
}