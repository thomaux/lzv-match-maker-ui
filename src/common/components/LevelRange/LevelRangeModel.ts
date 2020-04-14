export class LevelRangeModel {
    constructor(public min: number = undefined, public max: number = undefined) {}

    clear(): void {
        this.min = null;
        this.max = null;
    }
}