import { LevelRangeModel } from '../../common/components/LevelRange/LevelRangeModel';
import { Team, Region } from '../../common/models';

export interface CreateListingRequest {
    teamId: string;
    date: string;
    minLevel: number;
    maxLevel: number;
    gymId: number;
}

export class CreateListingModel {
    teamId: string;
    gymId: number;
    date: Date;
    levelRange: LevelRangeModel;

    lowestPossibleLevel = 5;

    constructor() {
        this.teamId = null;
        this.gymId = null;
        this.date = undefined;
        this.levelRange = new LevelRangeModel();
    }

    populate(team: Team): void {
        this.teamId = team.id;
        this.gymId = team.gym.id;
    }

    onRegionChanged(region: Region): void {
        this.gymId = undefined;
        this.levelRange.clear();
        this.lowestPossibleLevel = region.lowestPossibleLevel;
    }

    toRequestBody(): CreateListingRequest {
        return {
            teamId: this.teamId,
            gymId: this.gymId,
            date: this.date.toISOString(),
            minLevel: this.levelRange.min,
            maxLevel: this.levelRange.max
        };
    }
}
