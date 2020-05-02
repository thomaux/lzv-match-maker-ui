import { LevelRangeModel } from '../../common/components/LevelRange/LevelRangeModel';
import { Team, Region, Gym } from '../../common/models';

export interface CreateListingRequest {
    teamId: string;
    date: string;
    minLevel: number;
    maxLevel: number;
    gymId: number;
}

export class CreateListingModel {
    teamId: string;
    gym: Gym;
    date: Date;
    levelRange: LevelRangeModel;

    lowestPossibleLevel = 5;

    constructor() {
        this.teamId = null;
        this.gym = null;
        this.date = undefined;
        this.levelRange = new LevelRangeModel();
    }

    populate(team: Team): void {
        this.teamId = team.id;
        this.gym = team.gym;
    }

    onRegionChanged(region: Region): void {
        this.gym = undefined;
        this.levelRange.clear();
        this.lowestPossibleLevel = region.lowestPossibleLevel;
    }

    toRequestBody(): CreateListingRequest {
        if(!this.gym || !this.date || !this.levelRange.isValid() ) {
            return undefined;
        }

        return {
            teamId: this.teamId,
            gymId: this.gym.id,
            date: this.date.toISOString(),
            minLevel: this.levelRange.min,
            maxLevel: this.levelRange.max
        };
    }
}
