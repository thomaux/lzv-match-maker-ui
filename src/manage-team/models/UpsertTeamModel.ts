import { Team, Region, Gym } from '../../common/models';

export interface UpsertTeamRequest {
    name: string;
    gymId: number;
    level: number;
}

export class UpsertTeamModel {

    name: string;
    gym: Gym;
    level: number;

    existingTeamId: string;

    lowestPossibleLevel = 5;

    constructor() {
        this.name = null;
        this.gym = null;
        this.level = 1;
    }

    populate(team: Team): void {
        this.name = team.name;
        this.gym = team.gym;
        this.level = team.level;
        this.existingTeamId = team.id;
    }

    onRegionChanged(region: Region, isInit: boolean): void {
        this.lowestPossibleLevel = region.lowestPossibleLevel;
        if(!isInit) {
            this.level = 1;
        }
    }

    toRequest(): UpsertTeamRequest {
        return {
            name: this.name,
            gymId: this.gym.id,
            level: parseInt(this.level + '', 10)
        };
    }

}