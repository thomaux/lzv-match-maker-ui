import { inject, injectable } from 'inversify';
import { Team } from '../models';
import { ApiService } from './ApiService';

@injectable()
export class AuthService {

    private _isLoggedIn: boolean = null;
    private _teams: Team[] = null;

    constructor(
        @inject(ApiService) private apiService: ApiService) { }

    async isLoggedIn(): Promise<boolean> {
        if (this._isLoggedIn === null) {
            try {
                this._teams = await this.apiService.listTeams();
                this._isLoggedIn = true;
            } catch (e) {
                console.error('status should be 403?', e);
                this._isLoggedIn = false;
            }
        }
        return this._isLoggedIn;
    }

    async getTeamOfLoggedInUser(): Promise<Team> {
        await this.isLoggedIn();
        return this._teams.length ? this._teams[0] : undefined;
    }

    logout(): Promise<void> {
        this._isLoggedIn = false;
        return this.apiService.logout();
    }
}
