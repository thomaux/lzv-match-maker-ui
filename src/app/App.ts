import { Component, Vue } from 'vue-property-decorator';
import { AuthService } from '../common/services/AuthService';
import { lazyInject } from '../container';
import template from './App.html';
import './App.scss';

@Component({
    template
})
export class App extends Vue {
    isLoggedIn = false;

    @lazyInject(AuthService)
    authService: AuthService;

    async beforeMount(): Promise<void> {
        this.isLoggedIn = await this.authService.isLoggedIn();
    }

    logout(): void {
        this.authService.logout();
        this.isLoggedIn = false;
    }
}
