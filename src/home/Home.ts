import { Component, Vue } from 'vue-property-decorator';
import template from './Home.html';
import { AuthService } from "../common/services/AuthService"
import { lazyInject } from '../container';

@Component({
    template
})
export class Home extends Vue {

    isLoggedIn = false;

    @lazyInject(AuthService)
    authService: AuthService;

    async beforeMount() {
        this.isLoggedIn = await this.authService.isLoggedIn();
    }

    logout() {
        this.authService.logout();
        this.isLoggedIn = false;
    }
}