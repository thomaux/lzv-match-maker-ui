import { LevelRangeModel } from '../common/components/LevelRange/LevelRangeModel';

export class CreateListingModel {
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
