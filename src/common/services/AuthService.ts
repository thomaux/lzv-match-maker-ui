import { inject, injectable } from 'inversify';
import { HttpService } from './HttpService';
import { CONSTANTS } from '../../constants';

@injectable()
export class AuthService {

    private _isLoggedIn = null;

    constructor(
        @inject(CONSTANTS.AuthRoot) private authRoot: string,
        @inject(HttpService) private httpService: HttpService) {}

    async isLoggedIn(): Promise<boolean> {
        if(this._isLoggedIn === null) {
            const response = await this.httpService.get(this.authRoot + '/check');
            this._isLoggedIn = response.session;
        }
        return this._isLoggedIn;
    }

    logout(): Promise<void> {
        this._isLoggedIn = false;
        return this.httpService.delete(this.authRoot);
    }
}
