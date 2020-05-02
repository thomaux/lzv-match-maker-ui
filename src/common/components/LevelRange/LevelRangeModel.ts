export class LevelRangeModel {
    constructor(public min: number = undefined, public max: number = undefined) {}

    clear(): void {
        this.min = null;
        this.max = null;
    }

    isValid(): boolean {
        return this.max > 0 && this.min > this.max;
    }
}