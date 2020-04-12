import { LevelRangeModel } from '../common/components/LevelRange/LevelRangeModel';
import { Team } from '../common/models';

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

    constructor(team: Team) {
        this.teamId = team.id;
        this.gymId = team.gym.id;
        this.date = undefined;
        this.levelRange = new LevelRangeModel();
    }

    clearGymAndLevelRange(): void {
        this.gymId = undefined;
        this.levelRange = new LevelRangeModel();
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
