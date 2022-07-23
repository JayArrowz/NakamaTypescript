export class MyClass {
    private readonly aInteger: number;
    constructor(aInteger: number) {
        this.aInteger = aInteger;
    }

    public getInteger() {
        return this.aInteger;
    }
}