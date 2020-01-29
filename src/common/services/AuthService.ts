import { inject, injectable } from 'inversify';
import { HttpService } from './HttpService';

@injectable()
export class AuthService {

    private apiRoot = 'https://localhost:8443/auth';

    constructor(@inject(HttpService) private httpService: HttpService) { }

    async isLoggedIn(): Promise<boolean> {
        const response = await this.httpService.get(this.apiRoot + '/check');
        return response.session;
    }

    logout(): Promise<void> {
        return this.httpService.delete(this.apiRoot);
    }
}
