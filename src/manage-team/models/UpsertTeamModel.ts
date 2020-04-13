import { Team } from '../../common/models';

export interface UpsertTeamRequest {
    name: string;
    gymId: number;
    level: number;
}

export class UpsertTeamModel {

    name: string;
    gymId: number;
    level: number;

    existingTeamId: string;

    constructor(team: Team) {
        if (team) {
            this.name = team.name;
            this.gymId = team.gym.id;
            this.level = team.level;
            this.existingTeamId = team.id;
        }
    }

    clearGymAndLevel(): void {
        this.gymId = null;
        this.level = null;
    }

    toRequest(): UpsertTeamRequest {
        return {
            name: this.name,
            gymId: this.gymId,
            level: this.level
        };
    }
}