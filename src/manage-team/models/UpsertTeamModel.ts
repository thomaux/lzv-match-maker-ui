import { Team, Region, Gym } from '../../common/models';
import { required, ValidationResult } from '../../common/validation';

export interface UpsertTeamRequest {
    name: string;
    gymId: number;
    level: number;
}

export class UpsertTeamModel {

    name: string;
    gym: Gym;
    level: number;
    valid: boolean;

    existingTeamId: string;

    lowestPossibleLevel = 5;

    rules = {
        name: [
            required
        ],
        level: [
            required,
            (v: number): ValidationResult => (v >= 1 && v <= this.lowestPossibleLevel) || `Het nivea dient tussen 1 en ${this.lowestPossibleLevel} te liggen`
        ]
    };

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
        if (!isInit) {
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