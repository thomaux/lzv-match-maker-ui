import { Gym, Region, Team } from '../../common/models';

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
    time: string;
    levelRange: number[];

    lowestPossibleLevel = 5;

    constructor() {
        this.teamId = null;
        this.gym = null;
        this.date = undefined;
        this.levelRange = [1, this.lowestPossibleLevel];
    }

    populate(team: Team): void {
        this.teamId = team.id;
        this.gym = team.gym;
    }

    onRegionChanged(region: Region): void {
        this.gym = undefined;
        this.levelRange = [1, region.lowestPossibleLevel];
        this.lowestPossibleLevel = region.lowestPossibleLevel;
    }

    toRequestBody(): CreateListingRequest {
        if(!this.gym || !this.date ) {
            return undefined;
        }

        return {
            teamId: this.teamId,
            gymId: this.gym.id,
            date: this.date.toISOString(),
            minLevel: this.levelRange[1],
            maxLevel: this.levelRange[0]
        };
    }
}
