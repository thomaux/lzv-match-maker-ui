import { LevelRangeModel } from '../common/components/LevelRange/LevelRangeModel';

export class CreateListingRequest {
    date: string;
    minLevel: number;
    maxLevel: number;

    constructor(public readonly teamName: string, public readonly gymId: number, date: Date, levelRange: LevelRangeModel ) {
        this.date = date.toISOString();

        this.minLevel = levelRange.min;
        this.maxLevel = levelRange.max;
    }
}
