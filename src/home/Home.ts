import { Component, Vue } from 'vue-property-decorator';
import template from './Home.html';
import { logout, isLoggedIn } from "../common/services/AuthService"

@Component({
    template
})
export class Home extends Vue {

    isLoggedIn = false;

    async beforeMount() {
        this.isLoggedIn = await isLoggedIn();
    }

    logout() {
        logout();
        this.isLoggedIn = false;
    }
}