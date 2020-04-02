import { Route } from 'vue-router';
import { AuthService } from '../../common/services/AuthService';
import { container } from '../../container';

const authService = container.get(AuthService);    

export async function requireLoggedInUserAndTeamGuard(from: Route, to: Route, next: Function): Promise<void> {
    const isLoggedIn = await authService.isLoggedIn();

    if(!isLoggedIn || !authService.getTeamOfLoggedInUser()) {
        return next('/');
    } else {
        next();
    }
}
