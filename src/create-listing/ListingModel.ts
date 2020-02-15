import { LevelRangeModel } from '../common/models';

export class ListingModel {
    teamName: string;
    gymId: number;
    date: Date;
    levelRange: LevelRangeModel;

    constructor() {
        this.teamName = '';
        this.date = undefined;
        this.clearGymAndLevelRange();
    }

    clearGymAndLevelRange(): void {
        this.gymId = undefined;
        this.levelRange = new LevelRangeModel();
    }
}
