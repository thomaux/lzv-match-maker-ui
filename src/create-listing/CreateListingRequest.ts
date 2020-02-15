import { LevelRangeModel } from '../common/models';

export class CreateListingRequest {
    date: string;
    minLevel: number;
    maxLevel: number;

    constructor(public readonly teamName: string, public readonly gymId: number, date: Date, levelRange: LevelRangeModel ) {
        // TODO: map date input to date ISO string
        this.date = '2020-12-31T22:00:00.000Z';

        this.minLevel = levelRange.min;
        this.maxLevel = levelRange.max
    }
}
